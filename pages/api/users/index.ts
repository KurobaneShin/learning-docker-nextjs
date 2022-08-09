// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import api from "../../../services/users";

type Data = {
  name: string;
};

const handleGet: NextApiHandler = async (req, res) => {
  const { page } = req.query;

  const users = await api.getAllUsers(Number(page));

  res.status(200).json(users);
};

const handlePost: NextApiHandler = async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await api.addUser(name, email);

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
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
