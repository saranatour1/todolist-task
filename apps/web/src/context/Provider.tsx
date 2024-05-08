"use client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
  /** Put your mantine theme override here */
});

interface Props {
  children: React.ReactNode;
  session?: Session;
}
function Provider({ children, session }: Props) {
  return (
    <MantineProvider theme={theme}>
      <SessionProvider session={session}>{children}</SessionProvider>
    </MantineProvider>
  );
}

export default Provider;
