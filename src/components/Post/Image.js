import React from 'react';
import PropTypes from 'prop-types';

export default function Image({ caption, src }) {
  return <img src={src} caption={caption} />;
}

Image.propTypes = {
  caption: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};
