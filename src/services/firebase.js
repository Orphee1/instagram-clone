import { firebase, FieldValue } from '../lib/firebase';

export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map((user) => user.data().length > 0);
}

export async function getUserByUsername(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
}

// Get user from firestore where userID === userId (passed from the auth)

export async function getUserByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
  return user;
}

export async function getSuggestedProfiles(userId, following) {
  const result = await firebase.firestore().collection('users').limit(10).get();
  // console.log(result);
  const suggestedProfiles = result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter(
      (profile) =>
        profile.userId !== userId && !following.includes(profile.userId)
    );

  return suggestedProfiles;
}

export async function updateLoggedInUserFollowing(
  loggedInUserDocId,
  profileId, // The user that the logged-in user requests to follow
  isFollowingProfile // True or false, is the user yet following
) {
  return firebase
    .firestore()
    .collection('users')
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    });
}
export async function updateFollowedUserFollowers(
  profileDocId,
  loggedInUserDocId,
  isFollowingProfile
) {
  // True or false, is the user yet following

  return firebase
    .firestore()
    .collection('users')
    .doc(profileDocId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(loggedInUserDocId)
        : FieldValue.arrayUnion(loggedInUserDocId),
    });
}

export async function getPhotos(userId, following) {
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', 'in', following)
    .get();

  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));

  // console.log('userFollowedPhotos', userFollowedPhotos);

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }
      const user = await getUserByUserId(photo.userId);
      const { username } = user[0];
      return { username, ...photo, userLikedPhoto };
    })
  );

  return photosWithUserDetails;
}

// export async function getUserIdByUsername(username) {
//   const result = await firebase.firestore().collection('users').where();
// }

export async function getUserPhotosByUserName(username) {
  const [user] = await getUserByUsername(username);
  const result = await firebase
    .firestore()
    .collection('photos')
    // .where('userId', '==', user.uid)
    .where('userId', '==', user.userId)
    .get();

  const photos = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return photos;
}

export async function isUserFollowingProfile(
  loggedInUserUserName,
  profileUserId
) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', loggedInUserUserName)
    .where('following', 'array-contains', profileUserId)
    .get();

  const [response = {}] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return response.userId;
}

export async function toggleFollow(
  isFollowingProfile,
  activeUserDocId,
  profileDocId,
  profileUserId,
  followingUserId
) {
  await updateLoggedInUserFollowing(
    activeUserDocId,
    profileDocId,
    isFollowingProfile
  );
  await updateFollowedUserFollowers(
    profileDocId,
    followingUserId,
    isFollowingProfile
  );
}
