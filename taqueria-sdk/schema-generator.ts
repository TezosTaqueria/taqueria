import schemaGenerator from 'json-schema-generator'
import {writeJSON} from '@bevry/jsonfile'

const example = {
    pluginInfo: {
        schema: "1.0",
        version: "0.1",
        tasks: [
            {
                task: "compile",
                command: "compile [sourceFile]",
                aliases: ["c", "compile-ligo"],
                description: "Compile a smart contract written in a Ligo syntax to Michelson code",
                options: [
                    {
                        shortFlag: "e",
                        flag: "entry-point",
                        description: "The entry point that will be compiled"
                    },
                    {
                        shortFlag: "s",
                        flag: "syntax",
                        description: "The syntax used in the contract"
                    },
                    {
                        shortFlag: "i",
                        flag: "infer",
                        description: "Enable type inference"
                    }
                ],
                handler: "ligo"
            }
        ]
    },
}

const schema = schemaGenerator(example)
writeJSON("plugin-schema.json", schema)
.then(_ => console.log("Done!"))
.catch(err => console.log(`Err: ${err}`))
