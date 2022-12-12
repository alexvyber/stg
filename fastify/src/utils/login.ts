import type { FastifyReply } from "fastify/types/reply"
import type { FastifyRequest } from "fastify/types/request"
import { ObjectId } from "mongodb"
import { Fastify } from "../types"
import { createSession } from "./sessions"
import { createRefreshToken, createSessionToken } from "./tokens"

export async function login(
  fastify: Fastify,
  userId: ObjectId,
  request: FastifyRequest,
  reply: FastifyReply
) {
  const connectionInformation = {
    ip: request.ip,
    userAgent: request.headers["user-agent"]
  }

  // Create Session
  const sessionToken = await createSession(
    fastify,
    userId,
    connectionInformation
  )

  // Create JWTs
  const tokens = await Promise.all([
    createRefreshToken(sessionToken),
    createSessionToken(sessionToken, userId)
  ] as const)

  // Set Coockies
  reply
    .setCookie("refreshToken", tokens[0], {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      expires: new Date(new Date().setDate(new Date().getDate() + 30)) // expires in 30 days // ???: kinda cryprtic is there better way to do that
    })
    .setCookie("accessToken", tokens[1], {
      path: "/",
      domain: "localhost",
      httpOnly: true
    })
}
