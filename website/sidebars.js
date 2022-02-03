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
        "intro",
        "getting-started/installation",
        "getting-started/plugin-basics"
      ],
    },
    {
      type: "category",
      label: "Plugins",
      className: "sidebarHeader",
      collapsed: false,
      collapsible: false,
      items: [
        "plugins/plugin-ligo",
        "plugins/plugin-smartpy",
        "plugins/plugin-flextesa",
        "plugins/plugin-taquito",
        "plugins/plugin-typescript-generator",
        "plugins/plugin-mock-plugin",
      ],
    },
    {
      type: "category",
      label: "Example App",
      className: "sidebarHeader",
      collapsed: false,
      collapsible: false,
      items: [
        "hello-tacos-tutorial"
      ],
    },
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
        "taqueria-dev/contributions",
        "taqueria-dev/making-plugins",
        "taqueria-dev/pr-npm-packages"
      ],
    },
  ]
};

module.exports = sidebars;
