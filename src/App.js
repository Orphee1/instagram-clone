import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import UserContext from './context/user';
import useAuthListener from './hooks/use-auth-listener';

const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Notfound = lazy(() => import('./pages/Notfound'));

export default function App() {
  const { user } = useAuthListener();
  // console.log(user);

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.SIGNUP} component={Signup} />
            <Route path={ROUTES.DASHBOARD} component={Dashboard} />

            <Route component={Notfound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}
