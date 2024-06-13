import { useState } from "react";
import { Link } from "react-router-dom";

const Popeye = () => {
  // const [like, setLike] = useState(false);
  // const likeHandler = () => setLike(!like);
  return (
    <>
      <p>Hi, I am Popeye! I love to eat Spinach!</p>
      <Link to="/profiles">Click here to go back</Link>
      {/* <button onClick={likeHandler}>{like ? "Dislike" : "Like"}</button> */}
    </>
  );
};

export default Popeye;
