import { useRouter } from "next/router";
import { QRCodeSVG } from "qrcode.react";
import { useContext } from "react";

import { qrCodeStoreContext } from "@/context/qrCodeStore";
import { checkString } from "@/utils/typeCheck";
import HomeIcon from "@mui/icons-material/Home";
import { Box, Link, Stack, Typography } from "@mui/material";

const QrCode = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!checkString(id) || !id.trim().length) {
    return <NotFound />;
  }

  const { state } = useContext(qrCodeStoreContext);
  const qrCode = state?.find((qrCode) => qrCode.id === Number(id));
  if (!qrCode) return <NotFound />;

  return (
    <>
      <Box textAlign="right" padding={2}>
        <Link href="/">
          <HomeIcon fontSize="large" color="action" />
        </Link>
      </Box>
      <Stack
        height="80vh"
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
    </>
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

export default QrCode;
