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
            "quick-start/overview",
            "quick-start/installation",
            "quick-start/tasks",
            "quick-start/plugin-basics"
          ],
        },
        {
          type: "category",
          label: "Plugins",

          items: [

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
        
        
      ],
    }
  ]
};

module.exports = sidebars;
