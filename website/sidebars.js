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
      collapsed: true,
      collapsible: false,
      items: [
        "intro",
        {
          type: "category",
          label: "QuickStart",
          items: [
            "Quickstart/Start1",
            "Quickstart/Start2",
            "Quickstart/Start3",
          ],
        },
        {
          type: "category",
          label: "Resources",

          items: [
            "Resources/Changelog",
            "Resources/Gallery",
            "Resources/Plugins",
            "Resources/Tools",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Main Concepts",
      className: "sidebarHeader",
      collapsed: true,
      collapsible: false,
      items: [
        "Selections"
      ],
    }
  ]
};

module.exports = sidebars;
