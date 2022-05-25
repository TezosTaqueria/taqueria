import {z} from 'zod'
import createType from "@taqueria/protocol/Base"

export const rawSchema = z
    .string({description: "Command"})
    .regex(/^([A-Za-z-_ ]+ ?)((\[.+\] ?)|(\<.+\>) ?)*$/, "Must be a command that can be interpreted using yargs")

type RawInput = z.infer<typeof rawSchema>    

const {schemas: generatedSchemas, factory} = createType<RawInput>({
    isStringLike: true,
    rawSchema,
    parseErrMsg: (value: unknown) => `${value} is an invalid command. Expected format is: taskName [optional] <required>`,
    unknownErrMsg: "Something went wrong when parsing the command"
})

export type Command = z.infer<typeof generatedSchemas.schema>
export type t = Command
export const {create, make, of} = factory
export const schemas = {
    ...generatedSchemas,
    schema: generatedSchemas.schema.transform(val => val as Command)
}