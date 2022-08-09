// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prisma from "../../libs/prisma";

type Data = {
  name: string;
};

const handleGet: NextApiHandler = (req, res) => {
  // const Users = prisma.user.findMany();
  res.status(200).json({ ping: "pong" });
};

const handlePost: NextApiHandler = async (req, res) => {
  const { name, email } = req.body;

  const user = await prisma.user.create({
    data: {
      name,
      email,
    },
  });

  res.status(201).json({ status: "ok", user });
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return handleGet(req, res);
    case "POST":
      return handlePost(req, res);
    default:
      res.status(405);
  }
}
