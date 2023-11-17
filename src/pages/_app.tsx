import { QrCodeStoreProvider } from "@/context/qrCodeStore";

import type { AppProps } from "next/app";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <QrCodeStoreProvider>
      <Component {...pageProps} />
    </QrCodeStoreProvider>
  );
}
