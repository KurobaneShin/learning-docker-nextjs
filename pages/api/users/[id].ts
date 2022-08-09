import { NextApiHandler } from "next";
import prisma from "../../../libs/prisma";
import api from "../../../services/users";

const handleGet: NextApiHandler = async (req, res) => {
  const { id } = req.query;

  const user = await api.getUser(Number(id));

  user
    ? res.status(200).json(user)
    : res.status(404).json({ status: "not found" });
};

const handlePut: NextApiHandler = async (req, res) => {
  const { id } = req.query;
  const { name, active } = req.body;

  const data: {
    name?: string;
    active?: boolean;
  } = {};

  if (name) {
    data.name = name;
  }

  if (active && typeof active === "boolean") {
    data.active = active;
  }

  try {
    const user = await api.updateUser(Number(id), data);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const handleDelete: NextApiHandler = async (req, res) => {
  const { id } = req.query;

  try {
    await api.deleteUser(Number(id));
    res.status(200).json({ status: "ok" });
  } catch (error) {
    res.status(404).json({ status: "not found" });
  }
};

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "GET":
      return handleGet(req, res);
    case "PUT":
      return handlePut(req, res);
    case "DELETE":
      return handleDelete(req, res);
    default:
      res.status(405);
  }
};

export default handler;
