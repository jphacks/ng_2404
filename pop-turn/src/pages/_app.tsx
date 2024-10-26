import "@/styles/globals.css";
import { background, ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { initializeFirebaseApp } from "../firebase/config";

initializeFirebaseApp();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider
      theme={extendTheme({
        fonts: {
          body: `"M PLUS Rounded 1c", sans-serif;`,
          heading: `"M PLUS Rounded 1c", sans-serif;`,
        },
      })}
    >
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
