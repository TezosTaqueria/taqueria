### Compile the sample contract and Run the app

- `npm run setup`
- `npm run start`

### File Structure

- `app`
    
    - Minimal create react app
    - Call contract methods
    - Access contract storage

- `taqueria`

    - Everything related to the contract
    - `contract/.taq`
        - taqueria config folder, including setup for all required plugins
    - `contract/contracts`
        - the contract .ligo code
    - `contract/artifacts`
        - the compiled contract (*.tz file)
    - `contract/typings`
        - the contract typescript typing


