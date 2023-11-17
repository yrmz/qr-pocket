import { useRouter } from "next/router";
import { QRCodeSVG } from "qrcode.react";
import { useContext } from "react";

import { qrCodeStoreContext } from "@/context/qrCodeStore";
import { Box, Link, Stack, Typography } from "@mui/material";

const QrCode = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!checkId(id)) {
    return <NotFound />;
  }

  const { state } = useContext(qrCodeStoreContext);
  const qrCode = state?.find((qrCode) => qrCode.id === Number(id));
  if (!qrCode) return <NotFound />;

  return (
    <Stack
      height="100vh"
      alignContent="center"
      alignItems="center"
      justifyContent="center"
      spacing={4}
    >
      <QRCodeSVG value={qrCode.url} color="#7d7d7d" size={230} />
      <Link href={qrCode.url} color="ActiveCaption" underline="none">
        <Typography variant="h4">{qrCode.label}</Typography>
      </Link>
    </Stack>
  );
};

const NotFound: React.FC = () => (
  <Stack
    height="100vh"
    alignContent="center"
    alignItems="center"
    justifyContent="center"
    spacing={3}
  >
    <Typography variant="h3">Not Found</Typography>
  </Stack>
);

const checkId = (id: string | string[] | undefined): id is string =>
  typeof id === "string" && id.trim().length > 0;

export default QrCode;
