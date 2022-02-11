export default {
  "title": "Taqueria - Developer Tooling for Tezos",
  "tagline": "Taqueria - Developer Tooling for Tezos",
  "url": "https://taqueria.io",
  "baseUrl": "/",
  "onBrokenLinks": "throw",
  "onBrokenMarkdownLinks": "warn",
  "favicon": "/img/favicon.ico",
  "organizationName": "ecadlabs",
  "projectName": "taqueria",
  "presets": [
    [
      "@docusaurus/preset-classic",
      {
        "docs": {
          "path": "docs",
          "sidebarPath": "/Users/houstonkrohman/code/taqueria/website/sidebars.js",
          "editUrl": "https://github.com/ecadlabs/taqueria/edit/main/website/"
        },
        "blog": {
          "showReadingTime": true,
          "editUrl": "https://github.com/ecadlabs/taqueria/edit/main/website/blog/"
        },
        "theme": {
          "customCss": "/Users/houstonkrohman/code/taqueria/website/src/css/custom.css"
        }
      }
    ]
  ],
  "themeConfig": {
    "gtag": {
      "trackingID": "GTM-N6G3QD5",
      "anonymizeIP": true
    },
    "colorMode": {
      "defaultMode": "light",
      "disableSwitch": true,
      "respectPrefersColorScheme": false,
      "switchConfig": {
        "darkIcon": "🌙",
        "darkIconStyle": {
          "marginLeft": "2px"
        },
        "lightIcon": "😂",
        "lightIconStyle": {
          "marginLeft": "1px"
        }
      }
    },
    "navbar": {
      "logo": {
        "alt": "Tezos Taqueria Logo",
        "src": "/img/Taqueria_magenta_beta.svg"
      },
      "items": [
        {
          "type": "doc",
          "docId": "getting-started/installation",
          "label": " Get Started",
          "position": "right",
          "className": "header-link"
        },
        {
          "type": "doc",
          "docId": "intro",
          "position": "right",
          "label": "Docs",
          "className": "header-link"
        },
        {
          "type": "doc",
          "docId": "plugins",
          "label": "Plugins",
          "position": "right",
          "className": "header-link"
        },
        {
          "href": "https://discord.gg/bujt7syVVT",
          "position": "right",
          "className": "header-discord-link",
          "aria-label": "Discord"
        },
        {
          "href": "https://twitter.com/tezostaqueria",
          "position": "right",
          "className": "header-twitter-link",
          "aria-label": "Twitter"
        },
        {
          "href": "https://github.com/ecadlabs/taqueria",
          "position": "right",
          "className": "header-github-link",
          "aria-label": "GitHub repository"
        }
      ],
      "hideOnScroll": false
    },
    "footer": {
      "links": [
        {
          "title": "Contact",
          "items": [
            {
              "label": "Report Issues",
              "to": "https://github.com/ecadlabs/taqueria/issues/new/choose"
            },
            {
              "label": "Contribute",
              "to": "https://github.com/ecadlabs/taquito/blob/master/CONTRIBUTING.md"
            }
          ]
        },
        {
          "title": "Community",
          "items": [
            {
              "label": "Tezos Stack Exchange",
              "to": "https://tezos.stackexchange.com/questions/tagged/taqueria"
            },
            {
              "label": "Discord",
              "to": "https://discord.gg/bujt7syVVT"
            },
            {
              "label": "Twitter",
              "to": "https://twitter.com/tezostaqueria"
            },
            {
              "label": "Code of Conduct",
              "to": "https://github.com/ecadlabs/taquito/blob/master/code-of-conduct.md"
            },
            {
              "label": "GitHub",
              "to": "https://github.com/ecadlabs/taqueria"
            }
          ]
        },
        {
          "title": "Docs",
          "items": [
            {
              "label": "Quick Start",
              "to": "/docs/intro"
            },
            {
              "label": "Roadmap",
              "to": "https://github.com/ecadlabs/taqueria/milestones?direction=asc&sort=due_date&state=open"
            }
          ]
        },
        {
          "items": [
            {
              "html": "\n\t\t\t\t\t\t\t\t\t<a href=\"/\" target=\"_blank\" rel=\"noreferrer noopener\" aria-label=\"\">\n\t\t\t\t\t\t\t\t\t  <img class='footerLogo' src=\"/img/Taqueria_purple_beta.svg\" alt=\"\" />\n\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t  "
            },
            {
              "html": "\n\t\t\t\t\t\t\t\t\t<p class='footerDescription'>\n\t\t\t\t\t\t\t\t\t\tA New Way to Build on Tezos\n\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t  "
            },
            {
              "html": "\n\t\t\t\t\t\t\t\t\t<a class='footerButton' href='https://github.com/ecadlabs/taqueria'>\n\t\t\t\t\t\t\t\t\t\t<img class='footerGihubLogoButton' src=\"/img/githubSVG.svg\" alt=\"\" />\n\t\t\t\t\t\t\t\t\t\tGITHUB\n\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t  "
            },
            {
              "html": "form"
            },
            {
              "label": "Copyright © 2021 ECAD Labs - This project is licensed under Apache License, Version 2.0",
              "to": "/",
              "className": "copyright"
            }
          ]
        }
      ],
      "style": "light"
    },
    "prism": {
      "theme": {
        "plain": {
          "color": "#393A34",
          "backgroundColor": "#f6f8fa"
        },
        "styles": [
          {
            "types": [
              "comment",
              "prolog",
              "doctype",
              "cdata"
            ],
            "style": {
              "color": "#999988",
              "fontStyle": "italic"
            }
          },
          {
            "types": [
              "namespace"
            ],
            "style": {
              "opacity": 0.7
            }
          },
          {
            "types": [
              "string",
              "attr-value"
            ],
            "style": {
              "color": "#e3116c"
            }
          },
          {
            "types": [
              "punctuation",
              "operator"
            ],
            "style": {
              "color": "#393A34"
            }
          },
          {
            "types": [
              "entity",
              "url",
              "symbol",
              "number",
              "boolean",
              "variable",
              "constant",
              "property",
              "regex",
              "inserted"
            ],
            "style": {
              "color": "#36acaa"
            }
          },
          {
            "types": [
              "atrule",
              "keyword",
              "attr-name",
              "selector"
            ],
            "style": {
              "color": "#00a4db"
            }
          },
          {
            "types": [
              "function",
              "deleted",
              "tag"
            ],
            "style": {
              "color": "#d73a49"
            }
          },
          {
            "types": [
              "function-variable"
            ],
            "style": {
              "color": "#6f42c1"
            }
          },
          {
            "types": [
              "tag",
              "selector",
              "keyword"
            ],
            "style": {
              "color": "#00009f"
            }
          }
        ]
      },
      "darkTheme": {
        "plain": {
          "color": "#F8F8F2",
          "backgroundColor": "#282A36"
        },
        "styles": [
          {
            "types": [
              "prolog",
              "constant",
              "builtin"
            ],
            "style": {
              "color": "rgb(189, 147, 249)"
            }
          },
          {
            "types": [
              "inserted",
              "function"
            ],
            "style": {
              "color": "rgb(80, 250, 123)"
            }
          },
          {
            "types": [
              "deleted"
            ],
            "style": {
              "color": "rgb(255, 85, 85)"
            }
          },
          {
            "types": [
              "changed"
            ],
            "style": {
              "color": "rgb(255, 184, 108)"
            }
          },
          {
            "types": [
              "punctuation",
              "symbol"
            ],
            "style": {
              "color": "rgb(248, 248, 242)"
            }
          },
          {
            "types": [
              "string",
              "char",
              "tag",
              "selector"
            ],
            "style": {
              "color": "rgb(255, 121, 198)"
            }
          },
          {
            "types": [
              "keyword",
              "variable"
            ],
            "style": {
              "color": "rgb(189, 147, 249)",
              "fontStyle": "italic"
            }
          },
          {
            "types": [
              "comment"
            ],
            "style": {
              "color": "rgb(98, 114, 164)"
            }
          },
          {
            "types": [
              "attr-name"
            ],
            "style": {
              "color": "rgb(241, 250, 140)"
            }
          }
        ]
      },
      "additionalLanguages": []
    },
    "docs": {
      "versionPersistence": "localStorage"
    },
    "metadatas": [],
    "hideableSidebar": false,
    "tableOfContents": {
      "minHeadingLevel": 2,
      "maxHeadingLevel": 3
    }
  },
  "baseUrlIssueBanner": true,
  "i18n": {
    "defaultLocale": "en",
    "locales": [
      "en"
    ],
    "localeConfigs": {}
  },
  "onDuplicateRoutes": "warn",
  "customFields": {},
  "plugins": [],
  "themes": [],
  "titleDelimiter": "|",
  "noIndex": false
};
