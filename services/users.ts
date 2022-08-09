import prisma from "../libs/prisma";

const user = {
  getAllUsers: async (page: number) => {
    const perPage = 2;

    let offset = 0;

    if (page) {
      offset = (page - 1) * perPage;
    }

    return prisma.user.findMany({
      skip: offset,
      take: perPage,
      where: {
        active: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
      orderBy: {
        id: "asc",
      },
    });
  },

  addUser: async (name: string, email: string) => {
    return prisma.user.create({
      data: {
        name,
        email,
      },
    });
  },

  getUser: async (id: number) => {
    return prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
  },

  getUserFromEmail: async (email: string) => {
    return prisma.user.findFirst({
      where: {
        email,
        active: true,
      },
    });
  },

  updateUser: async (id: number, data: { name?: string; active?: boolean }) => {
    return prisma.user.update({
      where: {
        id: Number(id),
      },
      data,
    });
  },

  deleteUser: async (id: number) => {
    return prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
  },
};

export default user;
