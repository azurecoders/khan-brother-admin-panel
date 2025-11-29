"use client";

import { ReactNode, useMemo } from "react";
import { ApolloClient, InMemoryCache, ApolloLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import createUploadLink from "@/lib/uploadLink";

const ApolloClientProviderComponent = ({
  children,
}: {
  children: ReactNode;
}) => {
  const client = useMemo(() => {
    // Auth link to add token to requests
    const authLink = new ApolloLink((operation, forward) => {
      const token = typeof window !== "undefined"
        ? localStorage.getItem("admin_token")
        : null;

      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      }));

      return forward(operation);
    });

    const uploadLink = createUploadLink(
      (process.env.NEXT_PUBLIC_BACKEND_URL) + "/graphql"
    );

    return new ApolloClient({
      link: ApolloLink.from([authLink, uploadLink]),
      cache: new InMemoryCache(),
    });
  }, []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProviderComponent;
