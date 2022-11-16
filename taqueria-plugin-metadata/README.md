# Taqueria Metadata Plugin

The Taqueria Metadata plugin provides an easy way to create a json file containing `TZIP-16` compliant metadata related to a smart contract

## Requirements

- Taqueria v0.24.1 or later
- Node.js v16.17.1 or later

## Installation

To install the metadata plugin on a Taqueria project, navigate to the project folder and run:
```shell
taq install @taqueria/plugin-metadata
```

## Configuration

There is no configuration required  to run the plugin

## Usage

The Metadata plugin provides an interactive CLI interface that collects basic contract metadata fields as outlined in `TZIP-16` [specification](https://gitlab.com/tezos/tzip/-/blob/master/proposals/tzip-16/tzip-16.md), and generates a compliant JSON file that can be uploaded to IPFS

The metadata fields collected are:

|  name       		| description                           |   
|:-----------------:|:-------------------------------------:|
| name 		  		| Name of the contract	 				|
| version     		| Version of the contract       		|
| description      	| Description of the contract 		    |
| authors      		| List of authors		                |
| homepage      	| Homepage associated with the contract |
| license       	| Type of license e. g. ISC, MIT		|
| interfaces      	| List of interfaces 	               	|

To save time in multi-contract projects, `taq generate-project-metadata` can be run. This will collect project level metadata fields which are then provided as the default values for each subsequent invocation of `taq generate-metadata <contractName>`

The plugin exposes two tasks:
- `taq generate-metadata <contractName>` - Generates `TZIP-16` compliant metadata for a contract in JSON format 
- `taq generate-project-metadata` - Generates project level metadata that is written to `.taq/config.json`

Contract metadata is output into a JSON file in the `artifacts` directory, while project metadata is added to `.taq/config.json` as seen here:

```json
    "metadata": {
        "name": "string",
        "projectDescription": "string",
        "authors": [
            "string",
            "string"
        ],
        "homepage": "url",
        "license": "string"
    }
```

## Tasks

### `taq generate-metadata <contractName>`

The `generate-metadata` task starts an interactive interface that collects the relavent fields via CLI prompts and outputs a `TZIP-16` compliant metadata file in JSON format

> ### :page_with_curl: Note
> The contract may, or may not exist yet

#### Command Structure

```shell
taq generate-metadata <contractName>
```

#### Options

The metadata `generate-metadata` task will accept the following required parameters:

|  name        | description                           								|   
|:-------------|--------------------------------------------------------------------|
| contractName | The contract name (the contract may exist, or may not exist)     	|


#### Task Properties

|  attribute |  value                        		   | 
|------------|:---------------------------------------:|
|  task   	 | 'generate-metadata'         			   |
|  command   | 'generate-metadata < contractName >'    | 
|  aliases   |  N/A  		                           |


### `taq generate-project-metadata`

The `generate-project-metadata` task collects project-level metadata fields which are added to `config.json`. Once generated, these values will be used as defaults when generating contract metadata


#### Command Structure

```shell
taq generate-project-metadata
```

#### Options

The `generate-project-metadata` task not not have any additional parameters or options

#### Task Properties

|  attribute |  value                        		   | 
|:----------:|:---------------------------------------:|
|  task   	 | 'generate-project-metadata'             |
|  command   | 'generate-project-metadata'             | 
|  aliases   |  N/A 			                       |

## Behaviour

The user flow for each task is outlined below

### Generating or updating a metadata file for a contract

- Prompt the user for standard metadata fields, providing default values 
- If metadata already exists for a contract, it will use existing values as the default prompt values
- If contractName is not provided, it will prompt for contractName
- For a new contract metadata, it will find other contracts metadata and use those for the default values for common fields like authors, license, homepage this eliminates an extra step to define/register project metadata, but project metadata will be used as a priority if available

### Generating project metadata

- Add the project metadata to `.taq/config.json`
- Add the project metadata schema

### Default Value Priority

Summary of priority for default values:
- 1st Priority: Previous Values
- 2nd Priority: Project Values
- 3rd Priority: Existing Contract Metadata Values
- 4th Priority: Other Contract Values

## Plugin Architecture

This is a plugin developed for Taqueria built on NodeJS using the Taqueria Node SDK and distributed via NPM


