import { SanitizedArgs } from "taqueria-sdk/types";

type Opts = SanitizedArgs & Record<string, unknown>;

export const rickroll = async (parsedArgs: Opts) => {
    console.log('Please visit: https://youtu.be/dQw4w9WgXcQ');
}

