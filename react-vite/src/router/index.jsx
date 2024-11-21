import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import EventPage from '../components/EventPage'
import CreateEventPage from '../components/CreateEventPage';
import UpdateEventPage from '../components/UpdateEventPage/UpdateEventPage';
import LandingPage from '../components/LandingPage';
import CharacterListPage from '../components/CharacterListPage';
import CreateCharacterPage from '../components/CreateCharacterPage/CreateCharacterPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
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
      },
      {
        path:"characters",
        children: [
          {
            path: '',
            element: <CharacterListPage />,
          },
          {
            path:'new',
            element: <CreateCharacterPage />
          },
        ]
      }
    ],
  },
]);
