import { Link } from "react-router-dom";

const Profiles = () => {
  return (
    <section id="profiles">
      <ul>
        <li>
          <Link to="/profile/popeye">Popeye</Link>
        </li>
      </ul>
    </section>
  );
};

export default Profiles;
