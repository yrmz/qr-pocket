import { useRouter } from "next/router";
import QRCode from "qrcode.react";
import { FC, useContext, useReducer } from "react";

import { qrCodeStoreContext } from "@/context/qrCodeStore";
import { Box, Button, Divider, Stack, TextField } from "@mui/material";

type QrCodeForm = {
  label: string;
  url: string;
};

type Action =
  | {
      type: "add" | "remove" | "update";
      field: keyof QrCodeForm;
      value: string;
    }
  | { type: "reset" };

const qrCodeFormInit: QrCodeForm = {
  label: "",
  url: "",
};

const reducer = (state: QrCodeForm, action: Action) => {
  switch (action.type) {
    case "add":
      return { ...state, [action.field]: action.value };
    case "remove":
      return { ...state, [action.field]: "" };
    case "update":
      return { ...state, [action.field]: action.value };
    case "reset":
      return qrCodeFormInit;
    default:
      throw new Error(action satisfies never);
  }
};

export const QrCodeForm: FC = () => {
  const { dispatch: qrCodeStoreDispatch } = useContext(qrCodeStoreContext);
  const [state, dispatch] = useReducer(reducer, qrCodeFormInit);
  const handleUpdateState =
    (field: keyof typeof qrCodeFormInit) => (e: any) => {
      dispatch({ type: "update", field, value: e.target.value });
    };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    qrCodeStoreDispatch({
      type: "add",
      payload: state,
    });
    dispatch({ type: "reset" });
  };

  return (
    <Stack component="form" spacing={3} onSubmit={handleSubmit}>
      <TextField
        id="label"
        label="ラベル"
        variant="standard"
        value={state.label}
        autoComplete="off"
        required
        onChange={handleUpdateState("label")}
      />
      <TextField
        id="url"
        label="URL"
        value={state.url}
        variant="standard"
        autoComplete="off"
        required
        onChange={handleUpdateState("url")}
      />
      {state.url && (
        <>
          <Box textAlign="center" padding={2}>
            <QRCode value={state.url} color="#7d7d7d" size={230} />
          </Box>
          <Box textAlign="center">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              size="large"
            >
              Save
            </Button>
          </Box>
        </>
      )}
    </Stack>
  );
};
