
        const mintRequest = await contract.methodsObject.mint([{
                    token_id: tas.nat('42'),
                    ipfs_hash: tas.bytes(char2Bytes('DATA')),
                    owner: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                }]);
        await mintRequest.confirmation(3);
        