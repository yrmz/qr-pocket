import { Inter } from "next/font/google";
import Link from "next/link";
import { type } from "os";
import { QRCodeSVG } from "qrcode.react";
import { FC, useContext, useReducer } from "react";

import { QrCodeForm } from "@/component/qrCodeForm";
import { qrCodeStoreContext } from "@/context/qrCodeStore";
import {
  Box,
  Button,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { state } = useContext(qrCodeStoreContext);
  return (
    <Box margin={5} paddingX={5}>
      <Typography textAlign="center" variant="h3">
        トップページ
      </Typography>
      <QrCodeForm />
      <List>
        {state.map((qrCode) => (
          <ListItem>
            <Link href={`/qr/${qrCode.id}`}>{qrCode.label}</Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
