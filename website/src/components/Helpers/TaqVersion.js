import React from 'react'
import CodeBlock from '@theme/CodeBlock';

const pkg = require('@site/../package.json')

export default ({code,v}={code:false, v:false}) => {
    const str = v ? `v${pkg.version}` : pkg.version
    return code ? <CodeBlock>{str}</CodeBlock> : <span>{str}</span>
}