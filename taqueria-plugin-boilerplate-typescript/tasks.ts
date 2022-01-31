import { SanitizedArgs, ActionResponse, Failure, LikeAPromise, ProxyAction } from "@taqueria/node-sdk/types";

type Opts = SanitizedArgs & Record<string, unknown>;

export const rickroll = <T>(parsedArgs: Opts): LikeAPromise<ActionResponse, Failure<T>> => {
    return Promise.resolve({
        status: 'success',
        stderr: '',
        stdout: 'Please visit: https://youtu.be/dQw4w9WgXcQ'
    });
}

