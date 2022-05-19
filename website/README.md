# Website

The Taqueria website is based on [Docusaurus 2](https://docusaurus.io/), a modern static website generator that uses Yarn as a package manager and build tool

The generated site is deployed to [http://taqueria.io](https://taqueria.io), but can also be built and served locally

## How to Run the Website Locally

### Requirements

- Yarn v1.2 or later
- Node.js v16 or later

### Install dependencies

```shell
yarn
```

This command downloads the dependincies and plugins required by the site

### Build the Site

```shell
yarn build
```

This command runs a parser and pre-processor, then generates the static site content into the `build` directory

### Launch the Site

```shell
yarn start
```

This command will serve the website on [localhost:3000](http://localhost:3000)