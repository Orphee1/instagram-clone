import { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Photos from './Photos';
import { getUserPhotosByUserName } from '../../services/firebase';

export default function UserProfile({ user }) {
  // console.log(user);
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    photosCollection: [],
    followerCount: 0,
  };
  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getUserPhotosByUserName(user.username);

      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers.length,
      });
    }

    getProfileInfoAndPhotos();
  }, [user.username]);

  return (
    <>
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        followerCount={followerCount}
        setFollowerCount={dispatch}
        profile={profile}
      />
      <Photos photos={photosCollection} />
    </>
  );
}

UserProfile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number.isRequired,
    emailAddress: PropTypes.string.isRequired,
    followers: PropTypes.array.isRequired,
    following: PropTypes.array.isRequired,
    fullName: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};
