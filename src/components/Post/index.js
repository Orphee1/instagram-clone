import { useRef } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Image from './Image';
import Actions from './Actions';

export default function Post({ photo }) {
  console.log(photo);
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();
  return (
    <div className="rounded  col-span-4 border bg-white border-gray-primary mb-12">
      <Header username={photo.username} />
      <Image src={photo.imageSrc} caption={photo.caption} />
      <Actions
        docId={photo.docId}
        totalLikes={photo.likes.length}
        likedPhoto={photo.userLikedPhoto}
        handleFocus={handleFocus}
      />
    </div>
  );
}

Post.propTypes = {
  photo: PropTypes.shape({
    username: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,
    userLikedPhoto: PropTypes.bool.isRequired,
    likes: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
    dateCreated: PropTypes.number.isRequired,
  }),
};