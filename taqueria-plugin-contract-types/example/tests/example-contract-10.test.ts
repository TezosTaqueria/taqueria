
        const update_token_metadataRequest = await contract.methodsObject.update_token_metadata({
                0: tas.nat('42'),
                1: tas.bytes(char2Bytes('DATA')),
            });
        await update_token_metadataRequest.confirmation(3);
        