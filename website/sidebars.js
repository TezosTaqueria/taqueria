/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure

  docs: [
    {
      type: "category",
      label: "Getting Started",
      className: "sidebarHeader",
      collapsed: false,
      collapsible: false,
      items: [
        "getting-started/installation",
        "intro",
        "getting-started/quickstart",
        
      ],
    },
    {
      type: "category",
      label: "Configuration",
      className: "sidebarHeader",
      collapsed: false,
      collapsible: false,
      items: [
        "config/networks",
        "config/implicit-accounts",
        "config/sandbox-config"
      ],
    },
    {
      type: "category",
      label: "Plugin Reference",
      className: "sidebarHeader",
      collapsed: false,
      collapsible: false,
      items: [
        "plugins/plugin-basics",
        "plugins/plugin-flextesa",
        "plugins/plugin-archetype",
        "plugins/plugin-ligo",
        "plugins/plugin-taquito",
        "plugins/plugin-contract-types",
        "plugins/plugin-tezos-client",
        "plugins/plugin-smartpy",
        "plugins/plugin-jest",
      ],
    },
    {
      type: "category",
      label: "Taqueria Libraries",
      className: "sidebarHeader",
      collapsed: false,
      collapsible: false,
      items: [
        "libraries/taqueria-state"
      ],
    },
    // {
    //   type: "category",
    //   label: "Example App",
    //   className: "sidebarHeader",
    //   collapsed: false,
    //   collapsible: false,
    //   items: [
    //     "hello-tacos-tutorial"
    //   ],
    // },
    {
      type: "category",
      label: "Taqueria Internals",
      className: "sidebarHeader",
      collapsed: false,
      collapsible: false,
      items: [
        "taqueria-internals/architecture",
      ],
    },
    {
      type: "category",
      label: "Taqueria Development",
      className: "sidebarHeader",
      collapsed: false,
      collapsible: false,
      items: [
        "roadmap",
        "release-notes",
        "taqueria-dev/contributions",
        "taqueria-dev/making-plugins",
        "taqueria-dev/pr-npm-packages"
      ],
    },
  ]
};

module.exports = sidebars;
