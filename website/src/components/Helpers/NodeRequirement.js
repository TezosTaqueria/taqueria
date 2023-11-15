import React from 'react'

const msg = `v18.18 or later.`
export default ({download}={download:false}) => {
    const nodejs = download ? <a href='https://nodejs.org/en/download/' target='_blank'>Node.js</a> : <span>Node.js</span>
    return <span>{nodejs} {msg}</span>
}