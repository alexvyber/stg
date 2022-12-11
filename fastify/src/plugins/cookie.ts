import fp from "fastify-plugin"
import cookie, { type FastifyCookieOptions } from "@fastify/cookie"

export default fp<FastifyCookieOptions>(async fastify => {
  fastify.register(cookie, {
    secret: process.env.FASTIFY_COOCKIE_SECRET
  })
})
