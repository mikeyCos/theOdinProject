import { useState } from "react";

export function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  // ???
  const dispatch = (action) => {
    setState(reducer(state, action));
    // Or (?)
    // setState((prevState) => reducer(prevState, action));
  };

  return [state, dispatch];
}
