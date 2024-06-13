import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Bio = ({ delay }) => {
  const [bioText, setBioText] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/photos", { mode: "cors" })
        .then((response) => response.json())
        .then((response) =>
          setBioText("I like long walks on the beach and JavaScript")
        )
        .catch((error) => console.error(error));
    }, delay);
  }, []);

  if (!bioText) return <p>loading...</p>;

  return (
    bioText && (
      <>
        <p>{bioText}</p>
      </>
    )
  );
};

Bio.propTypes = {
  delay: PropTypes.number,
};

// const Bio = ({ bioText }) => {
//   if (!bioText) return <p>loading...</p>;

//   return (
//     bioText && (
//       <>
//         <p>{bioText}</p>
//       </>
//     )
//   );
// };

// Bio.propTypes = {
//   bioText: PropTypes.string,
// };

export default Bio;
