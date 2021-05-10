import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import UserContext from '../context/user';
import * as ROUTES from '../constants/routes';
import useUser from '../hooks/use-user';

export default function Header() {
  const { firebase } = useContext(FirebaseContext);
  const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUser(loggedInUser?.uid);

  return (
    <header className="h-16 bg-white border-b border-gray-primary mb-8 ">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer ">
            <h1 className="flex justify-center w-full ">
              <Link to={ROUTES.DASHBOARD} aria-label="Instagram logo">
                <img
                  src="/images/logo.png"
                  alt="Instagram"
                  className="mt-2 w-6/12"
                />
              </Link>
            </h1>
          </div>
          <div className="text-gray-700 text-center flex items-center align-items">
            {user ? (
              <>
                <Link to={ROUTES.DASHBOARD} arial-label="Dashboard">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 mr-6 text-black-light cursor-pointer"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </Link>
                <button
                  type="button"
                  title="Sign Out"
                  onClick={() => firebase.auth().signOut()}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      firebase.auth().signOut();
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 mr-6 text-black-light cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
                <div className="flex items-center cursor-pointer">
                  {/* <Link to={`/p/${user.displayName.toLowerCase()}`}> */}
                  <Link to={`/p/${user.username}`}>
                    <img
                      src={`/images/avatars/${user.username}.jpeg`}
                      // src={`${
                      //   user.username?.jpeg
                      //     ? `/images/avatars/${user.username}.jpeg`
                      //     : `/images/avatars/default.png`
                      // }     `}
                      alt={`${user.username} profile pic`}
                      className="rounded-full h-8 w-8 flex"
                    />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <button
                    className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                    type="button"
                  >
                    Log In
                  </button>
                </Link>
                <Link to={ROUTES.SIGNUP}>
                  <button
                    className="text-sm rounded text-blue-medium w-20 h-8 font-bold"
                    type="button"
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
