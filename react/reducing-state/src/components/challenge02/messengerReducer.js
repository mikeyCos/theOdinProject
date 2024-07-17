export const initialState = {
  selectedId: 0,
  // message: "Hello",
  messages: {
    0: "Hello",
  },
};

export function messengerReducer(state, action) {
  switch (action.type) {
    case "changed_selection": {
      return {
        ...state,
        selectedId: action.contactId,
        // message: state.messages[action.contactId] ?? "Hello",
        messages: {
          ...state.messages,
          ...(!state.messages[action.contactId] && {
            [action.contactId]: "Hello",
          }),
        },
      };
    }
    case "edited_message": {
      return {
        ...state,
        // message: action.message,
        messages: {
          ...state.messages,
          // [action.contactId]: action.message,
          [state.selectedId]: action.message,
        },
      };
    }
    case "sent_message": {
      return {
        ...state,
        // message: "",
        messages: {
          ...state.messages,
          // [action.contactId]: "",
          [state.selectedId]: "",
        },
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
