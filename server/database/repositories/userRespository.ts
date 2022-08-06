import prisma from "~/server/database/client";
import {IUser} from '~/types/IUser';

export async function getUserByEmail(email: string): Promise<IUser> {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      username: true,
    },
  })
}

export async function getUserByUserName(username: string): Promise<IUser> {
  return await prisma.user.findUnique({
    where: {
      username: username,
    },
    select: {
      id: true,
      username: true,
    },
  })
}

export async function createUser(data: IUser) {
  const user = await prisma.user.create({
    data: {
      username: data.username,
      name: data.name,
      email: data.email,
      loginType: data.loginType,
      password: data.password,
    },
  })

  return user
}

export async function getUserById(id: number): Promise<IUser> {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      username: true,
      email: true,
      stripeCustomerId: true,
    },
  })
}

export async function updateStripeCustomerId(data: IUser) {
  return await prisma.user.update({
    where: {email: data.email},
    data: {
      stripeCustomerId: data.stripeCustomerId,
    }
  })
}
