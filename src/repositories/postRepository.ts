import { prisma } from "./prisma";

export function createPost(content: string, userId: string) {
  return prisma.post.create({
    data: {
      content,
      userId,
    },
  });
}

export function createPostImage(image: string, userId: string) {
  return prisma.post.create({
    data: {
      image,
      userId,
    },
  });
}

export function findPosts() {
  return prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}
