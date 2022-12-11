import type { FastifyInstance } from "fastify/types/instance"
import type { FastifyBaseLogger } from "fastify/types/logger"
import type { FastifyTypeProviderDefault } from "fastify/types/type-provider"
import type { RawServerDefault } from "fastify/types/utils"
import type { IncomingMessage, ServerResponse } from "node:http"

export type Fastify = FastifyInstance<
  RawServerDefault,
  IncomingMessage,
  ServerResponse<IncomingMessage>,
  FastifyBaseLogger,
  FastifyTypeProviderDefault
> // HACK: hacky type. Find better way t oexpress this
