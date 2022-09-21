export const arl_template = `
archetype hello

variable msg : string = "Hello"

entry input(name : string) {
  msg += " " + name
}
`;
