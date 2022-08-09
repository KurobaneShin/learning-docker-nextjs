import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ status: "not authorized" });

    return;
  }

  res.json({ status: "ok" });
};

export default handler;
