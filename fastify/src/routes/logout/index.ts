import { FastifyPluginAsync } from "fastify"
import { logout } from "../../utils/logout"

const logoutUser: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post<{}>("/", async function (request, reply) {
    await logout(fastify, request, reply)

    reply.send({
      data: {
        status: "SUCCESS",
        message: "User logged out"
      }
    })
  })
}

export default logoutUser
