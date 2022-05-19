import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  menu: false,
  darker: false,
};

export const MenuContext = createContext(INITIAL_STATE);

const MenuReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE":
      return {
        menu: !state.menu,
      };
    case "MENU_OFF":
      return {
        menu: false,
      };
    case "DARKER_ON":
      return {
        darker: true,
      };
    case "DARKER_OFF":
      return {
        darker: false,
      };
    default:
      return state;
  }
};

export const MenuContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MenuReducer, INITIAL_STATE);

  return (
    <MenuContext.Provider
      value={{
        menu: state.menu,
        darker:state.darker,
        dispatch,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
