import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
// import Header from './components/Header/Header';
import Loading from './components/Loading/Loading';
import Login from './pages/Login/Login';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProtectedRouteStudent from './components/ProtectedRoute/ProtectedRouteStudent';
import LecturerHomePage from './pages/Lecturer/LecturerHomePage';
import ProtectedRouteLecturer from './components/ProtectedRoute/ProtectedRoteLecturer';
import StudentHomePage from './pages/Student/StudentHomePage';

const Layout = () => {
  const student = useSelector(state => state.account.user.role)
  return (
    <div className='container'>
      <div className='content'>
        <Outlet />
      </div>
    </div>
  )
}

const LayoutLecturer = () => {
  const lecturer = useSelector(state => state.accountLecturer.user.role)
  return (
    <div>

      <Outlet />
    </div>
  )
}

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.account.isLoading)
  const user = useSelector(state => state?.accountAdmin?.user)

  const router = createBrowserRouter([
    {
      path: "/student",
      element: <Layout />,
      errorElement: <Loading />,
      children: [
        {
          index: true, element:
            <ProtectedRouteStudent>
              <StudentHomePage />
            </ProtectedRouteStudent>
        },


      ],
    },

    {
      path: "/lecturer",
      element: <LayoutLecturer />,
      errorElement: <Loading />,
      children: [
        {
          index: true, element:
            <ProtectedRouteLecturer>
              <LecturerHomePage />
            </ProtectedRouteLecturer>
        },

      ],
    },






    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <>
      {isLoading === false
        || window.location.pathname === '/login'
        || window.location.pathname === '/'

        ? <RouterProvider router={router} />
        : <Loading />
      }

    </>
  );
}
