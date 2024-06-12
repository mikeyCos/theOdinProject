import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          {/* <a href="#">Home</a> */}
          <Link to="/">Home</Link>
        </li>
        <li>
          {/* <a href="#">Profile</a> */}
          <Link to="/profiles">Profiles</Link>
        </li>
        <li>
          <Link to="/eggs">Eggs</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
