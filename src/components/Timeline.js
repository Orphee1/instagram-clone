import React, { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import usePhotos from '../hooks/use-photos';
import Post from './Post/';
import LoggedInUserContext from '../context/logged-in-user';

export default function Timeline() {
  const { user } = useContext(LoggedInUserContext);
  // console.log(user);
  const { photos } = usePhotos(user);

  return (
    <div className="container col-span-2">
      {!photos ? (
        <Skeleton count={4} width={640} height={500} className="mb-5" />
      ) : photos?.length > 0 ? (
        photos.map((photo) => <Post key={photo.docId} photo={photo}></Post>)
      ) : (
        <p className="text-center text-2xl">Follow people to see photos</p>
      )}
    </div>
  );
}
