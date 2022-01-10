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
        "Selections",
        "Dynamicproperties",
        "Transformation",
        "Animations",
      ],
    },
    {
      type: "category",
      label: "Api Reference V 5.12.0",
      className: "sidebarHeader",
      collapsed: true,
      collapsible: false,
      items: [
        {
          type: "category",
          label: "Arrays",

          items: ["Arrays/arrays"],
        },
        {
          type: "category",
          label: "Axes",

          items: ["Axes/axes"],
        },
        {
          type: "category",
          label: "Brushes",

          items: ["Brushes/brushes"],
        },
        {
          type: "category",
          label: "Chords",

          items: ["Chords/chords"],
        },
        {
          type: "category",
          label: "Collections",

          items: ["Collections/collections"],
        },
        {
          type: "category",
          label: "Colors",

          items: ["Colors/colors"],
        },
        {
          type: "category",
          label: "ColorSchemes",

          items: ["ColorSchemes/colorschemes"],
        },
        {
          type: "category",
          label: "Contours",

          items: ["Contours/contours"],
        },
        {
          type: "category",
          label: "Delimiter-Seperated Values",

          items: ["Delimiter/delimiter"],
        },
        {
          type: "category",
          label: "Easings",

          items: ["Easings/easings"],
        },
        {
          type: "category",
          label: "Fetches",

          items: ["Fetches/fetches"],
        },
        {
          type: "category",
          label: "Forces",

          items: ["Forces/forces"],
        },
        {
          type: "category",
          label: "Number Formats",

          items: ["NumberFormats/numberformats"],
        },
        {
          type: "category",
          label: "Geographies",

          items: ["Geographies/geographies"],
        },
        {
          type: "category",
          label: "Hierarchies",

          items: ["Hierarchies/hierarchies"],
        },
      ],
    },
  ],
};

module.exports = sidebars;
