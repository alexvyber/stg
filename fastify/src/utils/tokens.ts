import { sign } from "jsonwebtoken"
import { ObjectId } from "mongodb"

const jwtSecret = process.env.FASTIFY_JWT_SECRET || "super-secret"

export const createRefreshToken = async (sessionToken: string) =>
  sign(
    {
      sessionToken
    },
    jwtSecret
  )

export const createSessionToken = async (
  sessionToken: string,
  userId: ObjectId
) =>
  sign(
    {
      sessionToken,
      userId
    },
    jwtSecret
  )
