import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import EventPage from '../components/EventPage'
import CreateEventPage from '../components/CreateEventPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
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
          }
        ]
      }
    ],
  },
]);
