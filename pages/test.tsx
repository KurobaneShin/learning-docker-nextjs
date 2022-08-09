import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import React from "react";
import { authUser } from "../types/next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

type Props = {
  loggedUser: authUser;
};

function test({ loggedUser }: Props) {
  return <div>{loggedUser.name}</div>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  return {
    props: {
      loggedUser: session.user,
    },
  };
};

export default test;
