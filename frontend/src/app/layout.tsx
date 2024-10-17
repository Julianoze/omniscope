"use client";

import type { Metadata } from "next";
import "./globals.css";

import { SidebarLayout } from "@/components/catalyst/sidebar-layout";
import { Navbar } from "@/components/catalyst/navbar";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { OmniscopeSidebar } from "@/app/components/OmniscopeSidebar";
import { InconsistencyAlerts } from "@/app/components/InconsistencyAlerts";
import { Providers } from "./providers";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";

// Create and export the Apollo Client instance
export const client = new ApolloClient({
  uri: "http://127.0.0.1:5000/graphql",
  cache: new InMemoryCache(),
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="bg-white lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950"
    >
      <head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <ApolloProvider client={client}>
        <body>
          <Providers>
            <SessionComponent>
              <SidebarLayout
                sidebar={<OmniscopeSidebar />}
                navbar={<Navbar>{/* Your navbar content */}</Navbar>}
              >
                <InconsistencyAlerts />
                <main>{children}</main>
              </SidebarLayout>
            </SessionComponent>
          </Providers>
        </body>
      </ApolloProvider>
    </html>
  );
}

function SessionComponent({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("google");
    }
    
    if (session) {
      console.log("User signed in:", session.user);
    }
  }, [session]);

  return <>{children}</>;
}
