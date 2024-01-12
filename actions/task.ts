"use server"

import { createTaskSchemaType } from "@/schema/createTask";
import { currentUser } from "@clerk/nextjs";

export async function createTask(data: createTaskSchemaType) {
  const user = await currentUser()

  if (!user) {
    throw new Error("User not found")
  }

  const {content, expiredAt, collectionId} = data

  return await prisma?.task.create({
    data: {
      userId: user.id,
      content,
      expiredAt,
      Collection: {
        connect: {
          id: collectionId
        }
      }
    }
  })
}

export async function setTaskToDone(id: number) {
  const user = await currentUser()

  if (!user) {
    throw new Error("User not found")
  }

  return await prisma?.task.update({
    where: {
      id: id,
      userId: user.id
    },
    data: {
      done: true
    }
  })
}