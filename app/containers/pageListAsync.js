import React from 'react';
import Loading from 'enl-components/Loading';
import loadable from '../utils/loadable';

// Dashboard
export const Home = loadable(() => import('./Dashboard'), {
  fallback: <Loading />,
});

export const Profile = loadable(() => import('./Pages/Profile/ReduxForm'), {
  fallback: <Loading />,
});

export const Organizations = loadable(() => import('./Pages/Organizations'), {
  fallback: <Loading />,
});

export const Users = loadable(() => import('./Pages/Users'), {
  fallback: <Loading />,
});

export const UserDetails = loadable(() => import('./Pages/Users/UserDetails'), {
  fallback: <Loading />,
});

// Pages
export const Login = loadable(() => import('./Pages/Users/Login'), {
  fallback: <Loading />,
});
export const Register = loadable(() => import('./Pages/Users/Register'), {
  fallback: <Loading />,
});
export const ResetPassword = loadable(() => import('./Pages/Users/ResetPassword'), {
  fallback: <Loading />,
});

// Other
export const NotFound = loadable(() => import('./NotFound/NotFound'), {
  fallback: <Loading />,
});
export const TermsConditions = loadable(() => import('./Pages/TermsConditions'), {
  fallback: <Loading />,
});
