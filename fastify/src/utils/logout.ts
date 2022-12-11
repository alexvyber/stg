import type { FastifyReply } from "fastify/types/reply"
import type { FastifyRequest } from "fastify/types/request"
import { Fastify } from "../types"
import { removeSession } from "./sessions"

const jwtSecret = process.env.FASTIFY_JWT_SECRET || "super-secret"

import { verify } from "jsonwebtoken"

export async function logout(
  fastify: Fastify,
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { refreshToken } = request.cookies

  if (!refreshToken) {
    throw new Error("No refresh token provided")
  }

  const { sessionToken } = verify(refreshToken, jwtSecret) as {
    sessionToken: string
  } // FIXME: fix typings

  fastify.log.info({ sessionToken })

  await removeSession(fastify, sessionToken)

  // Remove Cookies
  reply.clearCookie("refreshToken").clearCookie("accessToken")
}
