import { SanitizedArgs } from "taqueria-sdk/types";

type Opts = SanitizedArgs & {
    target?: string,
};

export const rickroll = async (parsedArgs: Opts) => {
    if(!parsedArgs.target){
        throw new Error('You must specify a target');
    }

    console.log(`${parsedArgs.target} - Please visit: https://youtu.be/dQw4w9WgXcQ`);
}

