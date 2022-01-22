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
        "getting-started/installation"
      ],
    },
    {
      type: "category",
      label: "Plugins",
      className: "sidebarHeader",
      collapsed: false,
      collapsible: false,
      items: [
        "plugins"
      ],
    },
    {
      type: "category",
      label: "Example App",
      className: "sidebarHeader",
      collapsed: false,
      collapsible: false,
      items: [
        "hello_tacos"
      ],
    },
    {
      type: "category",
      label: "Taqueria Internals",
      className: "sidebarHeader",
      collapsed: false,
      collapsible: false,
      items: [
        "architecture",
        "making_plugins"
      ],
    },
  ]
};

module.exports = sidebars;
