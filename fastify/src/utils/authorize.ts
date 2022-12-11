// TODO: figure out propper way to place this code

import type { UserData } from "../entities/user"
import type { ObjectId } from "mongodb"

import { compare } from "bcryptjs"
import { Fastify } from "../types"

// HACK: hacky way to pass mongo with entire fastify object
// ???: Is ii right?
export const authorizeUser = async (
  fastify: Fastify,
  userData: UserData
): Promise<{ isAuthorized: boolean; userId: ObjectId }> => {
  // Error in no db availible
  if (!fastify.mongo.db) {
    throw new Error("No db connection")
  }

  const users = fastify.mongo.db.collection("users")

  // Look up user
  const user = await users.findOne({
    "email.address": userData.email
  })

  if (!user) {
    throw new Error("No user found with provided email")
  }

  // Compare provided password against saved in db
  const isAuthorized = await compare(userData.password, user.hashedPassword)

  // Return user from database
  return { isAuthorized, userId: user._id }
}
