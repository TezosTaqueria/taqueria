# Taqueria Toolkit

A client-side package to load Taqueria config and state into a (d)App.

### Quickstart

1. Initialize a taqueria project: `taq init`
1. Create an app in `./app`.
1. In app, install the toolkit: `npm i -S @taqueria/toolkit`.
1. In your app, use the toolkit to get an address of an originated contract: 
```ts
import {loadFromEnv, getAliasAddress} from "@taqueria/toolkit"
const config = await loadFromEnv(process.env)
const address = getAliasAddress(config, "hello-tacos")
```
1. Build the app with the needed environment variables: `withTaq --projectdir ./ npm run app:build`.  
> This will populate environment variables needed by the toolkit

### Using with create-react-app
1. Initialize a taqueria project: `taq init`
1. Create a react app: `npx create-react-app ./app --template typescript`
1. In `./app/.env`, add `SKIP_PREFLIGHT_CHECK=true`.
1. In `./app`, run: `npm install`
1. In `./app`, run: `npm i -S @taqueria/toolkit`.
1. In `./app`, edit index.tsx to pass environment variables to the App component:
```ts
<App env={process.env}/>
``` 
1. In `./app`, edit App.tsx to include the toolkit:
```ts
import {loadFromEnv, getAliasAddress} from "@taqueria/toolkit"

type AppProps = {
  env: Record<string, string|undefined>
}

function App(props: AppProps) {
    const [contractAddress, setContractAddress] = useState<string|undefined>(undefined)

    useEffect(async ()=>{
        const config = await loadFromEnv(props.env)
        // "hello-tacos" is the name of the contract
        setContractAddress(getAliasAddress(config, "hello-tacos"))
    })
}
```
1. Adjust the build and start scripts in `package.json` to use the toolkit to populate the necessary environment variables:
```json
"scripts": {
    "start": "withTaq --projectDir ../ --prefix REACT_APP_ react-scripts start",
    "build": "withTaq --projectDir ../ --prefix REACT_APP_ react-scripts build",
}
```

### How it works

The `withTaq` command populates the environment with variables needed by the toolkit. These variables will include your Taqueria & environment configuration:
```sh
TAQ_CONFIG=[base64 encoded data]
TAQ_CONFIG_LOCAL_DEVELOPMENT=[base64 encoded data]
TAQ_CONFIG_LOCAL_TESTING=[base64 encoded data]
```

An environment variable will exist for each environment configuration file that exists in your Taqueria project.

These environment variables are then consumed in your app using `loadFromEnv`:
```ts
import loadFromEnv from `@taqueria/toolkit`
const config = await loadFromEnv(process.env)
```

Rather than having to set these environment variables manually, you can wrap a command using `withTaq`:
```sh
withTaq --projectDir ../ npm run build
```

The above command is an example of how you would populate the environment variables needed when running `npm run build`.

### Advanced Usage:

In some cases and app frameworks, environment variables need special prefixes to be included in your app's environment context. For instance, apps created using `create-react-app` will only have access to environment variables with the `REACT_APP_` prefix. To handle this, two modifications are required:

#### Adjust withTaq to use the prefix
```sh
withTaq --projectDir ../ --prefix "REACT_APP_" npm run build
```

#### Adjust the loadFromEnv call to use the prefix
```ts
import loadFromEnv from `@taqueria/toolkit`
const config = await loadFromEnv(process.env, "REACT_APP_")
```