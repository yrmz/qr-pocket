import {
  createContext,
  useEffect,
  useLayoutEffect,
  useReducer,
  useState,
} from "react";

import { checkString } from "@/utils/typeCheck";

type Props = {
  children: React.ReactNode;
};

type QrCodeStore = {
  id: number;
  label: string;
  url: string;
}[];

type Action =
  | { type: "add"; payload: { label: string; url: string } }
  | { type: "remove"; payload: { id: number } }
  | { type: "update"; payload: { id: number; label: string; url: string } }
  | { type: "init"; payload: { id: number; label: string; url: string }[] };

const reducer = (state: QrCodeStore, action: Action): QrCodeStore => {
  const newState = ((state: QrCodeStore, action: Action) => {
    switch (action.type) {
      case "add": {
        const id = state.length ? state.splice(-1)[0].id + 1 : 1;
        return [...state, { id, ...action.payload }];
      }
      case "remove": {
        return state.filter((qrCode) => qrCode.id !== action.payload.id);
      }
      case "update": {
        return state.map((qrCode) =>
          qrCode.id === action.payload.id ? action.payload : qrCode
        );
      }
      case "init": {
        return action.payload;
      }
      default:
        throw new Error("Action not recognized");
    }
  })(state, action);
  localStorage.setItem("qrCodeStore", JSON.stringify(newState));
  return newState;
};

const parseQrCodeStore = (value: string | null): QrCodeStore => {
  try {
    if (!checkString(value)) return [];
    const qrCodeStore = JSON.parse(value) as QrCodeStore;
    return Array.isArray(qrCodeStore) ? qrCodeStore : [];
  } catch (e) {
    console.log(e);
    return [];
  }
};

type QrCodeStoreContext = {
  state: QrCodeStore;
  dispatch: React.Dispatch<Action>;
};

export const qrCodeStoreContext = createContext({} as QrCodeStoreContext);

export const QrCodeStoreProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  useLayoutEffect(() => {
    const value = localStorage.getItem("qrCodeStore");
    const qrCodeStoreInit = parseQrCodeStore(value);
    if (!qrCodeStoreInit.length || state === qrCodeStoreInit) return;
    dispatch({ type: "init", payload: qrCodeStoreInit });
  }, []);

  return (
    <qrCodeStoreContext.Provider value={{ state, dispatch }}>
      {children}
    </qrCodeStoreContext.Provider>
  );
};
