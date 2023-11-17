import { createContext, useEffect, useReducer } from "react";

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
  | { type: "reset"; payload: {} }
  | { type: "init"; payload: { id: number; label: string; url: string }[] };

const reducer = (state: QrCodeStore, action: Action): QrCodeStore => {
  const newState = (() => {
    switch (action.type) {
      case "add": {
        const id = state.length ? state.splice(-1)[0].id + 1 : 0;
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
      case "reset": {
        return [];
      }
      case "init": {
        return action.payload;
      }
      default:
        throw new Error(action satisfies never);
    }
  })();
  localStorage.setItem("qrCodeStore", JSON.stringify(newState));
  return newState;
};

type QrCodeStoreContext = {
  state: QrCodeStore;
  dispatch: React.Dispatch<Action>;
};

export const qrCodeStoreContext = createContext({} as QrCodeStoreContext);

export const QrCodeStoreProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const qrCodeStore = localStorage.getItem("qrCodeStore");
    const qrCodeStoreInit = parseQrCodeStore(qrCodeStore);
    if (!qrCodeStoreInit.length || state === qrCodeStoreInit) return;
    dispatch({ type: "init", payload: qrCodeStoreInit });
  }, []);

  console.log(state);
  return (
    <qrCodeStoreContext.Provider value={{ state, dispatch }}>
      {children}
    </qrCodeStoreContext.Provider>
  );
};

const parseQrCodeStore = (value: any): QrCodeStore => {
  if (checkTypeQrCodeStore(value)) return value;
  return [];
};

const checkTypeQrCodeStore = (value: any): value is QrCodeStore => {
  try {
    const array = JSON.parse(value);
    if (!Array.isArray(array)) return false;
    return array.every(
      (obj) =>
        typeof obj.id === "number" &&
        typeof obj.label === "string" &&
        typeof obj.url === "string"
    );
  } catch (e) {
    console.error("Invalid JSON:", e);
    return false;
  }
};
