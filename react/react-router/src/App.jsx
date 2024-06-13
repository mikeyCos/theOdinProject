// import { Link } from "react-router-dom";
// import "./styles/App.css";

// function App() {
//   return (
//     <div>
//       <h1>Hello from the main page of the app!</h1>
//       <p>Here are some examples of links to other pages</p>
//       <nav>
//         <ul>
//           <li>
//             {/* <a href="profile">Profile page</a> */}
//             <Link to="profile">Profile page</Link>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// }

// export default App;
import routes from "./components/routes";
import {
  createBrowserRouter,
  BrowserRouter as Router,
  RouterProvider,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";

const router = createBrowserRouter(routes);

const App = () => {
  return (
    // Import BrowserRouter as Router
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<BasicLayout />}>
    //       <Route index element={<Home />} />
    //       <Route path="/profile" element={<Profile />} />
    //     </Route>
    //   </Routes>
    // </Router>
    // OR
    <RouterProvider router={router} />
  );
};

export default App;
