import React from 'react';
import User from './User';
import Suggestions from './Suggestions';
import useUser from '../../hooks/use-user';

export default function Sidebar() {
  const {
    user: { docId, userId, username, fullName, following },
  } = useUser();
  // console.log(following);
  return (
    <div className="p-4">
      <User username={username} fullName={fullName} />
      <Suggestions
        userId={userId}
        following={following}
        loggedInUserDocId={docId}
      />
    </div>
  );
}
