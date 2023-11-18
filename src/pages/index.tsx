import { Inter } from "next/font/google";
import Link from "next/link";
import { useContext } from "react";

import { QrCodeForm } from "@/component/qrCodeForm";
import { qrCodeStoreContext } from "@/context/qrCodeStore";
import { Box, List, ListItem, Typography } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { state } = useContext(qrCodeStoreContext);
  return (
    <Box marginY={5} marginX={{ md: 30, sm: 5 }}>
      <Typography textAlign="center" variant="h4" marginBottom={5}>
        QR Pocket
      </Typography>
      <QrCodeForm />
      {!!state.length && (
        <Box marginTop={5}>
          <Typography variant="h5">QR Code List</Typography>
          <List>
            {state.map((qrCode) => (
              <ListItem key={qrCode.label}>
                <Link href={`/qr/${qrCode.id}`}>{qrCode.label}</Link>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
}
