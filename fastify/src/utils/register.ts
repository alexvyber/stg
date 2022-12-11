// TODO: figure out propper way to place this code

import type { UserData } from "../entities/user"
import type { ObjectId } from "mongodb"

import { genSalt, hash } from "bcryptjs"
import { Fastify } from "../types"

// HACK: hacky way to pass mongo with entire fastify object
// ???: Is ii right?
export const register = async (
  fastify: Fastify,
  userData: UserData
): Promise<ObjectId> => {
  // Error in no db availible
  if (!fastify.mongo.db) {
    throw new Error("No db connection")
  }

  const users = fastify.mongo.db.collection("users")

  // generate salt
  const salt = await genSalt(10)

  // hash with salt
  const hashedPassword = await hash(userData.password, salt) // ???: learn more how salting affect hashinng spped

  const res = await users.insertOne({
    email: {
      address: userData.email,
      verified: false
    },
    hashedPassword
  })

  // Return user from database
  return res.insertedId
}
