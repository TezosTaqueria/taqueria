# Website

The Taqueria website is based on [Docusaurus 2](https://docusaurus.io/), a modern static website generator that uses Yarn as a package manager and build tool

The generated site is deployed to [http://taqueria.io](https://taqueria.io), but can also be built and served locally

## How to Run the Website Locally

### Requirements
- Yarn v1.2 or later
- Node.js v16 or later

### Install dependencies and build the Site
From the project root directory, run:

```shell
$ npm run build-website
```

This command runs `npm ci --legacy-peer-deps` as well as a parser and pre-processor, then generates the static site content into the `website/build` directory

### Launch the Site
From the project root directory, run:

```shell
$ npm run serve-website
```

This command will serve the website on [localhost:3000](http://localhost:3000)
