import { useEffect, useState } from "react";

const useImageURL = () => {
  const [imageURL, setImageURL] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos", { mode: "cors" })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Server error");
        }

        return response.json();
      })
      .then((data) => setImageURL(data[0].url))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { imageURL, error, loading };
};

export default useImageURL;
