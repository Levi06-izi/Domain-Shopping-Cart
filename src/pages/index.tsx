import { Inter } from "next/font/google";
import Head from "next/head";
import { Container } from "@chakra-ui/react";
import { Challenge } from "@/components/challenge";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Frontend React Challenge</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Container paddingY={12}>
        <Challenge maxDomains={2} />
      </Container>
    </>
  );
}
