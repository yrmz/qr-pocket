import { useRouter } from 'next/router';
import { QRCodeSVG } from 'qrcode.react';
import { useContext } from 'react';

import { qrCodeStoreContext } from '@/context/qrCodeStore';
import { checkString } from '@/utils/typeCheck';
import HomeIcon from '@mui/icons-material/Home';
import { Box, LinearProgress, Link, Stack, Typography } from '@mui/material';

const QrCode = () => {
  const router = useRouter();
  const { state } = useContext(qrCodeStoreContext);
  const { id } = router.query;
  if (!state.length || !id)
    return (
      <Layout>
        <Typography variant="h6">Loading...</Typography>
        <Box sx={{ width: 250 }}>
          <LinearProgress />
        </Box>
      </Layout>
    );

  const qrCode = state.find((qrCode) => qrCode.id.toString() === id);
  if (!qrCode)
    return (
      <Layout>
        <NotFound />
      </Layout>
    );

  return (
    <Layout>
      <QRCodeSVG value={qrCode.url} color="#7d7d7d" size={230} />
      <Link href={qrCode.url} color="ActiveCaption" underline="none">
        <Typography variant="h4">{qrCode.label}</Typography>
      </Link>
    </Layout>
  );
};

const Layout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => (
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
      {children}
    </Stack>
  </>
);

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
