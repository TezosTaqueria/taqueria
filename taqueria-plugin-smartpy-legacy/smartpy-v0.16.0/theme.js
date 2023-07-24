// Copyright 2019-2022 Smart Chain Arena LLC.

/** Set light/dark mode based on user preferences */
$(document).ready(() => {
    if (window) {
        setThemeClass(window.localStorage.getItem('theme', 'light'));
    }
});

// Define a new stylesheet for the theme's custom rules
const sheet = (function () {
    // Create the <style> tag
    const style = document.createElement('style');

    // WebKit hack :(
    style.appendChild(document.createTextNode(''));

    // Add the <style> element to the page
    document.head.appendChild(style);

    return style.sheet;
})();

// Replace non-root rules in custom stylesheet
const replaceRules = (rules) => {
    for (let i = 0; i < sheet.rules.length; i++) {
        sheet.deleteRule(i);
    }
    sheet.insertRule(`@media all {${rules}}`);
};

const activateDarkMode = () => {
    const rootElement = document.querySelector(':root');
    const darkTheme = {
        '--primary': '#006dcc',
        '--primary-text-color': '#fafafa',

        '--background-color': '#212529',
        '--link-color': '#66AACC',
        '--button-hover-color': 'slategray',
        '--menu-bg-color': '#05385C',
        '--border-color': '#D3D3D3',

        '--output-bgok': '#05364a',
        '--output-bgko': '#4a3605',

        '--danger-color': '#dc3545',
        '--dataColumn-color': 'blanchedalmond',
        '--simulationBuilder-bg-color': '#444488',
        '--tabcontentshow-bg-color': 'darkgreen',

        '--key-address-color': 'chocolate',
        '--timestamp-color': 'aqua',
        '--code-type-color': 'magenta',
        '--code-variable-color': 'khaki',
        '--code-store-color': 'greenyellow',
        '--code-constant-color': 'red',
        '--code-cons-color': 'hotpink',
        '--code-comment-color': 'chocolate',

        '--button-bg-color': '#FFF',
        '--button-font-color': '#000',

        /* Wallet colors */
        '--applied-op-color': '#94b84d',
        '--failed-op-color': '#d16864',
    };

    const darkRules = `
    button.editor-menu-btn:not([disabled]):hover {
        color: var(--background-color);
        background-color: #e8e8e8;
    }

    .right-submenu button,
    .pretty-submenu button {
        background-color: var(--primary-text-color);
    }

    #outputPanel.empty-output {
        background: rgba(30, 30, 30, .8) url(logo-transp.png) center/40% no-repeat;
        background-blend-mode: color;
    }

    #logo-image {
        background: url(dm-logo.png) left/75% no-repeat;
    }

    .modal-content {
        background-color: var(--menu-bg-color);
    }

    /** XXX: url of svgs is different here than from stylesheet */
    #editor-link {
        background-image: url(./svgs/dm-terminal.svg);
    }

    #wallet-link {
        background-image: url(./svgs/wallet-light.svg);
    }

    #faucet-link {
        background-image: url(./svgs/dm-faucet.svg);
    }

    #explorer-link {
        background-image: url(./svgs/dm-search.svg);
    }

    #node_explorer-link {
        background-image: url(./svgs/dm-search.svg);
    }

    #michelson-link {
        background-image: url(./svgs/dm-stream.svg);
    }

    #origination-link {
        background-image: url(./svgs/dm-stream.svg);
    }

    #help-link {
        background-image: url(./svgs/dm-question.svg);
    }

    #ledger-img {
        background-image: url(./svgs/ledger-light.svg);
        background-repeat: no-repeat;
    }
    `;

    for (let k in darkTheme) {
        rootElement.style.setProperty(k, darkTheme[k]);
    }

    replaceRules(darkRules);
};

const activateLightMode = () => {
    const rootElement = document.querySelector(':root');
    const lightTheme = {
        '--primary': '#006dcc',
        '--primary-text-color': '#212529',

        '--background-color': '#fafafa',
        '--link-color': '#01608C',
        '--button-hover-color': '#e8e8e8',
        '--menu-bg-color': '#f1f1f1',
        '--border-color': '#D3D3D3',

        '--output-bgok': '#f1f1fa',
        '--output-bgko': '#faf1f1',

        '--danger-color': '#dc3545',
        '--dataColumn-color': '#290075',
        '--simulationBuilder-bg-color': '#f0fde1',
        '--tabcontentshow-bg-color': '#ccffcc',

        '--key-address-color': '#006600',
        '--timestamp-color': '#6600AA',
        '--code-type-color': '#331188',
        '--code-variable-color': '#aa0000',
        '--code-store-color': '#0000aa',
        '--code-constant-color': '#000088',
        '--code-cons-color': '#0000aa',
        '--code-comment-color': '#006600',

        '--button-bg-color': '#006dcc',
        '--button-font-color': '#FFF',

        /* Wallet colors */
        '--applied-op-color': '#e8ffc2',
        '--failed-op-color': '#ffcfbf',
    };

    const lightRules = `button.editor-menu-btn:not([disabled]):hover {
        color: var(--primary-text-color);
        background-color: var(--background-color);
    }

    .right-submenu button,
    .pretty-submenu button {
        background-color: inherit;
    }

    #outputPanel.empty-output {
        background: rgba(255, 255, 255, .9) url(smartPY.only.transp.png) center/40% no-repeat;
        background-blend-mode: color;
    }

    #logo-image {
        background: url(smartPY_horizon.transp.png) left/75% no-repeat;
    }

    .modal-content {
        background-color: #fff;
    }

    /** XXX: url of svgs is different here than from stylesheet */
    #editor-link {
        background-image: url(./svgs/terminal.svg);
    }

    #wallet-link {
        background-image: url(./svgs/wallet-dark.svg);
    }

    #faucet-link {
        background-image: url(./svgs/faucet.svg);
    }

    #explorer-link {
        background-image: url(./svgs/search.svg);
    }

    #node_explorer-link {
        background-image: url(./svgs/search.svg);
    }

    #michelson-link {
        background-image: url(./svgs/stream.svg);
    }

    #origination-link {
        background-image: url(./svgs/stream.svg);
    }

    #help-link {
        background-image: url(./svgs/question.svg);
    }

    #ledger-img {
        background-image: url(./svgs/ledger-dark.svg);
        background-repeat: no-repeat;
    }
    `;

    for (let k in lightTheme) {
        rootElement.style.setProperty(k, lightTheme[k]);
    }

    replaceRules(lightRules);
};

const setThemeClass = (theme) => {
    if (theme === 'dark') {
        activateDarkMode();
    } else {
        activateLightMode();
    }
};
