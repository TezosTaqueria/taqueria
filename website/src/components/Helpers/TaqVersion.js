import React from 'react'
import CodeBlock from '@theme/CodeBlock';

const pkg = require('@site/../package.json')

export default ({code,v}={code:false, v:false}) => {
    const version = process.env.TAQ_VERSION ?? pkg.version
    const str = v ? `v${version}` : version
    return code ? <CodeBlock>{str}</CodeBlock> : <span>{str}</span>
}