export interface SanitizedPath {
    __kind: 'sanitized-path',
    value: string
}

export const make = (path:string): SanitizedPath => ({
    __kind: 'sanitized-path',
    value: /^(\.\.|\.\/|\/)/.test(path)
    ? path : `./${path}`
})

export const view = (path: SanitizedPath) => path.value
    
export default {
    make,
    view
}