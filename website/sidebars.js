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
      label: "Overview",
      className: "sidebarHeader",
      collapsed: false,
      collapsible: false,
      items: [
        "intro",
        "glossary"
      ],
    },
    {
      type: "category",
      label: "Getting Started",
      className: "sidebarHeader",
      collapsed: false,
      collapsible: false,
      items: [
        "getting-started/overview",
        "getting-started/installation",
        "getting-started/quick-start"
      ],
    },
    {
      type: "category",
      label: "Using Taqueria",
      className: "sidebarHeader",
      collapsed: false,
      collapsible: false,
      items: [
        "guides/build-from-source",
        "guides/install-plugins"
      ],
    },
    {
      type: "category",
      label: "Resources",
      className: "sidebarHeader",
      collapsed: false,
      collapsible: false,
      items: [
        "resources/plugins",
        "resources/faq",
        "resources/troubleshooting",
        "resources/changelog"
      ],
    },
  ]
};

module.exports = sidebars;
