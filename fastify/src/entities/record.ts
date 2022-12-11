import { Static, Type } from "@sinclair/typebox"

export const Record = Type.Object({
  text: Type.String()
})

export type RecordData = Static<typeof Record>
