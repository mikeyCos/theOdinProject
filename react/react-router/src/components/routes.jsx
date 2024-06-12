// import ErrorPage from "./ErrorPage.jsx";
import Home from "./Home";
import Profiles from "./Profiles";
import Profile from "./Profile";
import ErrorPage from "./ErrorPage";
import BasicLayout from "./BasicLayout";

const routes = [
  {
    element: <BasicLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profiles",
        element: <Profiles />,
      },
      {
        path: "/profile/:name",
        element: <Profile />,
      },
    ],
  },
];

export default routes;
