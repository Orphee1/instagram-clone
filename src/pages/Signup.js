import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { doesUsernameExist } from '../services/firebase';

export default function SignUp() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  const handleSignup = async (e) => {
    e.preventDefault();
    const usernameExists = await doesUsernameExist(userName);

    if (!usernameExists.length) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);
        await createdUserResult.user.updateProfile({
          displayName: userName,
        });

        await firebase.firestore().collection('users').add({
          userId: createdUserResult.user.uid,
          username: userName.toLowerCase(),
          fullName,
          emailAddress: emailAddress.toLowerCase(),
          emailAddress: emailAddress,
          following: [],
          dateCreated: Date.now(),
        });
        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        console.log(error);
        setEmailAddress('');
        setFullName('');
        setUserName('');
        setError(error.message);
      }
    } else {
      setError('That username is already taken, please try another');
    }
  };
  useEffect(() => {
    document.title = 'Sign Up - Instagram';
  }, []);

  return (
    <div className="container flex m-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img
          src="/images/iphone-with-profile.jpeg"
          alt="iPhone with Instagram"
        />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded ">
          <h1 className="flex justify-center w-full">
            <img
              src="/images/logo.png"
              alt="Instagram"
              className="mt-2 w-6/12 mb-4"
            />
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
          <form onSubmit={handleSignup} method="POST">
            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-base  w-full mr-3 py-5 px-4 h2 border border-gray-primary rounded mb-2"
              value={userName}
              onChange={({ target }) => setUserName(target.value)}
            />
            <input
              aria-label="Enter your full name"
              type="text"
              placeholder="Full Name"
              className="text-sm text-gray-base  w-full mr-3 py-5 px-4 h2 border border-gray-primary rounded mb-2"
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
            />
            <input
              aria-label="Enter your email adress"
              type="text"
              placeholder="Email adress"
              className="text-sm text-gray-base  w-full mr-3 py-5 px-4 h2 border border-gray-primary rounded mb-2"
              value={emailAddress}
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base  w-full mr-3 py-5 px-4 h2 border border-gray-primary rounded mb-2"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold
          ${isInvalid && 'opacity-50'} 
          `}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
          <p className="text-sm">
            Have an account? {``}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
