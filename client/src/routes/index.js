import * as React from "react";
import { useRoutes } from "react-router-dom";
// guard
import AuthGuard from "../guard/AuthGuard";
// pages
import LoginPage from '../page/Login';
import RegisterPage from '../page/Register';
import HomePage from '../page/Home';
import LocationPage from '../page/Location';
import ProfilePage from '../page/Profile';

function Routes() {
  return useRoutes([
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/",
      element: (
        <AuthGuard>
          <HomePage />
        </AuthGuard>
      ),
    },
    {
      path: "/location/:locationId",
      element: (
        <AuthGuard>
          <LocationPage />
        </AuthGuard>
      ),
    },
    {
      path: "/user",
      children: [
        {
          path: "profile",
          element: (
            <AuthGuard>
              <ProfilePage />
            </AuthGuard>
          ),
        }
      ]
    }
  ]);
}

export default Routes;