import React from 'react';
import User from './User';
import Suggestions from './Suggestions';
import useUser from '../../hooks/use-user';

export default function Sidebar() {
  const {
    user: { userId, username, fullName },
  } = useUser();
  console.log(username, userId, fullName);
  return (
    <div className="p-4">
      <User />
      <Suggestions />
    </div>
  );
}
