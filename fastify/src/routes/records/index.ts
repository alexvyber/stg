import { FastifyPluginAsync } from "fastify"
import { RecordData } from "../../entities/record"

import { createRecord, getRecord } from "../../utils/records"

const registerUser: FastifyPluginAsync = async (
  fastify,
  _opts
): Promise<void> => {
  fastify.post<{ Body: RecordData; Reply: any }>(
    "/",
    async function (request, reply) {
      // reply with 400 if user already logen in
      if (!request.cookies.accessToken && !request.cookies.refreshToken) {
        reply.code(400).send({
          data: {
            status: "FAILED",
            message: "Not authorized"
          }
        })
      }

      if (!request.body?.text) {
        reply.badRequest("bad text")
      }

      const recordId = await createRecord(fastify, request.body)

      if (!recordId) {
        reply.code(400).send({
          data: {
            status: "FAILED",
            message: "Failed to create record"
          }
        })
      }

      const record = await getRecord(fastify, recordId)

      reply.send({
        data: {
          status: "SUCCESS",
          record
        }
      })
    }
  )
}

export default registerUser
