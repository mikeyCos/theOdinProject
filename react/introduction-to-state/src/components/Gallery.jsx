import { useState } from "react";
import { sculptureList } from "../data/data.gallery";
import "../styles/gallery.css";

export default function Gallery() {
  const maxIndex = sculptureList.length - 1;
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  const prevClickHandler = () => {
    setIndex(index === 0 ? maxIndex : index - 1);
  };

  const nextClickHandler = () => {
    setIndex(index === maxIndex ? 0 : index + 1);
  };

  const showMoreClickHandler = () => {
    setShowMore(!showMore);
  };

  const sculpture = sculptureList[index];
  return (
    <div className="gallery">
      <button onClick={prevClickHandler}>Prev</button>
      <button onClick={nextClickHandler}>Next</button>
      <h2>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <img src={sculpture.url} alt={sculpture.alt} />
      <button onClick={showMoreClickHandler}>
        {showMore ? "Hide" : "Show"} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
    </div>
  );
}
