import React from 'react'
import CodeBlock from '@theme/CodeBlock';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default ({code,v}={code:false, v:false}) => {

    const {siteConfig: {customFields: {TAQ_VERSION: version}}} = useDocusaurusContext();
    const str = v ? `v${version}` : version
    return code ? <CodeBlock>{str}</CodeBlock> : <span>{str}</span>
}