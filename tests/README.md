## Taqueria Tests

### Installation

- If you're going to be running the unit tests you need to make sure that deno is installed on your system. Installation instructions can be found [here](https://deno.land/manual@v1.18.2/getting_started/installation)
- for E2e tests and Integration tests, if you are running from built sources, start with `npm run build-all`

### Running the Tests:
- The tests should be run from the taqueria root folder by calling the test run script with the workspace specified: `npm run test:{unit|integration|e2e} -w tests`
    - If you're going to be running the unit tests then you will need deno installed on your system

### CICD
- Tests E2E tests and Unit tets are run in CICD in every push. 
- To run the integration tests in a CICD run, add the word "integration" to your merge commit command.
```