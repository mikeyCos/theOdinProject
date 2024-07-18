import { useEffect, useRef, useState } from "react";
import styles from "../styles/CatFriends.module.css";
import { flushSync } from "react-dom";

/*export default function CatFriends() {
  const [index, setIndex] = useState(0);
  const [catList, setCatList] = useState([]);
  const listRef = useRef(null);

  useEffect(() => {
    fetch(
      "https://api.thecatapi.com/v1/images/search?size=small&limit=9&mime_types=png"
    )
      .then((response) => response.json())
      .then((data) => setCatList(data));
  }, []);

  return (
    <>
      <nav>
        <button
          onClick={() => {
            const newIndex = index < catList.length - 1 ? index + 1 : 0;
            const catListItem = listRef.current.children[newIndex];
            catListItem.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: "center",
            });
            setIndex(newIndex);
          }}
          className={styles["next-btn"]}
        >
          Next
        </button>
      </nav>
      <div>
        <ul ref={listRef} className={styles["cat-imgs"]}>
          {catList.map((cat, i) => (
            <li key={cat.id}>
              <img
                className={`${styles["cat-img"]} ${
                  styles[index === i ? "active" : ""]
                } `}
                src={cat.url}
                alt={"Cat #" + cat.id}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
} */

/* Alternate solution
 *
 */

export default function CatFriends() {
  const selectedRef = useRef(null);
  const [catList, setCatList] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch(
      "https://api.thecatapi.com/v1/images/search?size=small&limit=9&mime_types=png"
    )
      .then((response) => response.json())
      .then((data) => setCatList(data));
  }, []);

  return (
    <>
      <nav>
        <button
          onClick={() => {
            flushSync(() => {
              if (index < catList.length - 1) {
                setIndex(index + 1);
              } else {
                setIndex(0);
              }
            });
            selectedRef.current.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: "center",
            });
          }}
          className={styles["next-btn"]}
        >
          Next
        </button>
      </nav>
      <div>
        <ul className={styles["cat-imgs"]}>
          {catList.map((cat, i) => (
            <li key={cat.id} ref={index === i ? selectedRef : null}>
              <img
                className={`${styles["cat-img"]} ${
                  styles[index === i ? "active" : ""]
                } `}
                src={cat.url}
                alt={"Cat #" + cat.id}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
