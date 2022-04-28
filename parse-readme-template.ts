const fs = require("fs");
const path = require("path");
const eta = require("eta");

// website plugin docs directory
const docsDir = path.join(__dirname, "website", "docs", "plugins");

// typed list of plugin paths to search
const plugins: string[] = [
  "taqueria-plugin-archetype",
  // "taqueria-plugin-contract-types",
  "taqueria-plugin-flextesa",
  "taqueria-plugin-ligo",
  // "taqueria-plugin-smartpy",
  // "taqueria-plugin-taquito",
  // "taqueria-protocol",
  // "taqueria-sdk",
  // "taqueria-vscode-extension",
];

// typed list of github variables with their values
const gitHubVariables: { [key: string]: string } = {
    output: "github",
    cautionOpenAdmonition: "\> ### :warning: CAUTION\n\> ",
    noteOpenAdmonition: "\> ### :page_with_curl: Note\n\> ",
    closeAdmonition: "",
};

// typed list of docusaurus variables with their values
const docVariables: { [key: string]: string } = {
    output: "docs",
    cautionOpenAdmonition: ":::caution\n",
    noteOpenAdmonition: ":::note\n",
    closeAdmonition: ":::\n",
};

// for each plugin process the readme file
const processNewReadmeFiles = plugins.map((pluginName) => {
    console.log(`Started processing ${pluginName}`);
    const template = fs.readFileSync(
        path.join(__dirname, pluginName, "_readme.eta"),
        "utf8"
    );

    const gitHubReadme = fs.writeFileSync(
        path.join(__dirname, pluginName, "README.md"),
        eta.render(template, gitHubVariables),
        "utf8"
    );
    const docReadme = fs.writeFileSync(
        path.join(docsDir, "_" + pluginName + ".mdx"),
        eta.render(template, docVariables),
        "utf8"
    );
    console.log(`Finished processing ${pluginName}`);
});

export {};