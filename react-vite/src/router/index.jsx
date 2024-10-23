import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import EventPage from '../components/EventPage'
import CreateEventPage from '../components/CreateEventPage';
import UpdateEventPage from '../components/UpdateEventPage/UpdateEventPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome! Please Log in or Sign up before proceeding. No features will work properly while logged out</h1>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path:"events",
        children: [
          {
            path: '',
            element: <EventPage />,
          },
          {
            path:'new',
            element: <CreateEventPage />
          },
          {
            path: ':event_id/update',
            element: <UpdateEventPage />
          }
        ]
      }
    ],
  },
]);
