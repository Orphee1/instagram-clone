import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

export default function Photos({ photos }) {
  // console.log(photos);
  return <div></div>;
}

Photos.propTypes = {
  photos: PropTypes.array.isRequired,
};
