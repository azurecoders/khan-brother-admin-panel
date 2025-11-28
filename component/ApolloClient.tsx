"use client";

import { ReactNode } from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import createUploadLink from "@/lib/uploadLink";

const uploadLink = createUploadLink(
  (process.env.NEXT_PUBLIC_BACKEND_URL) + "/graphql"
);

const client = new ApolloClient({
  link: uploadLink,
  cache: new InMemoryCache(),
});

const ApolloClientProviderComponent = ({
  children,
}: {
  children: ReactNode;
}) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProviderComponent;
