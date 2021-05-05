import React from 'react';
import PropTypes from 'prop-types';

export default function Footer({ caption, username }) {
  return (
    <div className="p-4 pt-2 pb-O">
      <span className="mr-1 font-bold">{username}</span>
      <span>{caption}</span>
    </div>
  );
}

Footer.propTypes = {
  caption: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
