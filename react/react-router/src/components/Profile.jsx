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
import { useContext, useState } from "react";
import FileContext from "./FileContext";
import { useOutletContext, useParams } from "react-router-dom";
import Popeye from "./Popeye";
import Spinach from "./Spinach";
import DefaultProfile from "./DefaultProfile";

const Profile = () => {
  const [counter, setCounter] = useOutletContext();
  const [like, setLike] = useState(false);
  // const { like, setLike } = useContext(FileContext);

  const { name } = useParams();
  const incrementHandler = () => setCounter((counter) => counter + 1);
  const likeHandler = () => setLike(!like);
  return (
    <section id="profile" key={name}>
      <h2>Hello from profile page!</h2>
      <p>So, how are you?</p>
      {/* <h2>The profile visited is here:</h2> */}
      {name === "popeye" ? (
        <Popeye key={name} />
      ) : name === "spinach" ? (
        <Spinach />
      ) : (
        <DefaultProfile />
      )}
      <button onClick={incrementHandler}>Increment</button>
      <p>
        Count: <span>{counter}</span>
      </p>
      <button onClick={likeHandler}>{like ? "Dislike" : "Like"}</button>
    </section>
  );
};

export default Profile;
