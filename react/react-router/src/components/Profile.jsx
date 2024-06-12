// import { useParams } from "react-router-dom";
// import Popeye from "./Popeye";
// import Spinach from "./Spinach";
// import DefaultProfile from "./DefaultProfile";

// const Profile = () => {
//   const { name } = useParams();
//   return (
//     <section>
//       <h2>Hello from profile page!</h2>
//       <p>So, how are you?</p>
//       <h2>The profile visited is here:</h2>
//       {/* <Outlet />? */}
//       {name === "popeye" ? (
//         <Popeye />
//       ) : name === "spinach" ? (
//         <Spinach />
//       ) : (
//         <DefaultProfile />
//       )}
//     </section>
//   );
// };

// export default Profile;

import { useParams } from "react-router-dom";
import Popeye from "./Popeye";
import Spinach from "./Spinach";
import DefaultProfile from "./DefaultProfile";

const Profile = () => {
  const { name } = useParams();
  return (
    <section id="profile">
      <h2>Hello from profile page!</h2>
      <p>So, how are you?</p>
      {/* <h2>The profile visited is here:</h2> */}
      {name === "popeye" ? (
        <Popeye />
      ) : name === "spinach" ? (
        <Spinach />
      ) : (
        <DefaultProfile />
      )}
    </section>
  );
};

export default Profile;
