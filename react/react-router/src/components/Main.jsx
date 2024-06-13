import { useState } from "react";
import { Outlet } from "react-router-dom";
import FileContext from "./FileContext";

// const Main = ({ children }) => {
//   return <main>{children}</main>;
const Main = () => {
  const [counter, setCounter] = useState(0);
  // const [like, setLike] = useState(false);
  return (
    <main>
      {/* <FileContext.Provider value={{ like, setLike }}> */}
        {/* <Outlet context={[counter, setCounter, like, setLike]} /> */}
      {/* </FileContext.Provider> */}
      <Outlet context={[counter, setCounter]} />
    </main>
  );
};

export default Main;
