import { useEffect, useState } from "react";
import useImageURL from "../hooks/useImageURL";

const Image = () => {
  const { imageURL, error, loading } = useImageURL();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    imageURL && (
      <div>
        <img src={imageURL} alt="An image" />
      </div>
    )
  );
};

export default Image;
