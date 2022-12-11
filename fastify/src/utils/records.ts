// TODO: figure out propper way to place this code

import { ObjectId } from "mongodb"
import type { RecordData } from "../entities/record"
import type { Fastify } from "../types"

// HACK: hacky way to pass mongo with entire fastify object
// ???: Is ii right?
export const createRecord = async (
  fastify: Fastify,
  recordData: RecordData
): Promise<any> /* Promise<ObjectId> */ => {
  // Error in no db availible
  if (!fastify.mongo.db) {
    throw new Error("No db connection")
  }

  const records = fastify.mongo.db.collection("records")

  const res = await records.insertOne({
    text: recordData.text
  })

  return res.insertedId
}

export const getRecord = async (fastify: Fastify, recordId: ObjectId) => {
  // Error in no db availible
  if (!fastify.mongo.db) {
    throw new Error("No db connection")
  }

  const records = fastify.mongo.db.collection("records")

  const res = await records.findOne({
    _id: new ObjectId(recordId)
  })

  return res
}
