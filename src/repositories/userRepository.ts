import { prisma } from "./prisma";

export function createUser(email: string, name: string) {
  return prisma.user.create({
    data: {
      email,
      name,
    },
  });
}

export function updateUser(id: string, email: string, name: string) {
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      email,
      name,
    },
  });
}

export function addUserPicture(id: string, path: string) {
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      avatar: path,
    },
  });
}

export function deleteUser(id: string) {
  return prisma.user.delete({
    where: {
      id,
    },
  });
}

export function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export function findUserByid(id: string) {
  if (!id) {
    return null;
  }
  // .user property available because of the model created by prisma
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}
