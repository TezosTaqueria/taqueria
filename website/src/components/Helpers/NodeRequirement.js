import React from 'react'

const msg = `v16.16 or later. (v17.x.x or later is not supported)`
export default ({download}={download:false}) => {
    const nodejs = download ? <a href='https://nodejs.org/en/download/' target='_blank'>Node.js</a> : <span>Node.js</span>
    return <span>{nodejs} {msg}</span>
}