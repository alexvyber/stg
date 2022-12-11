import { ObjectId } from "mongodb"
import { randomBytes } from "node:crypto"
import { Fastify } from "../types/index.js"

export const createSession = async (
  fastify: Fastify,
  userId: ObjectId,
  connection: any // FIXME: use appropriate type
) => {
  try {
    // Error in no db availible
    if (!fastify.mongo.db) {
      throw new Error("No db connection")
    }

    // Generate a session token
    const sessionToken = randomBytes(64).toString("hex")

    // retrieve connection information
    const { ip, userAgent } = connection

    const sessions = fastify.mongo.db.collection("sessions")

    await sessions.insertOne({
      sessionToken,
      userId,
      valid: true,
      userAgent,
      ip,
      updatedAt: new Date(),
      createdAt: new Date()
    })

    // Return session token
    return sessionToken
  } catch (e) {
    throw new Error("Session Creation Failed")
  }
}

export const removeSession = async (fastify: Fastify, sessionToken: string) => {
  // Error in no db availible
  if (!fastify.mongo.db) {
    throw new Error("No db connection")
  }

  const sessions = fastify.mongo.db.collection("sessions")

  await sessions.deleteOne({ sessionToken })
}

export const getSession = async (fastify: Fastify, sessionToken: string) => {
  // Error in no db availible
  if (!fastify.mongo.db) {
    throw new Error("No db connection")
  }

  const sessions = fastify.mongo.db.collection("sessions")

  return sessions.findOne({ sessionToken })
}
