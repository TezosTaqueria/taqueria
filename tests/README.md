## Taqueria Tests
### Unit Tests
Running the unit tests requires deno is installed on your system. Installation instructions can be found [here](https://deno.land/manual@v1.18.2/getting_started/installation)

### E2E and Integration tests
If you are running from built sources, start with `pnpm run build-all`
- The tests should be run from the taqueria root folder by calling the test run script with the workspace specified: `pnpm run test:{unit|integration|e2e} -w tests`
- the package.json file in the /tests directory lists various combinations of tests that can be invoked from the command line.