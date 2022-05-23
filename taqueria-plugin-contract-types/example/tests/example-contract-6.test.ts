
        const confirm_adminRequest = await contract.methodsObject.confirm_admin();
        await confirm_adminRequest.confirmation(3);
        
        const pauseRequest = await contract.methodsObject.pause(true);
        await pauseRequest.confirmation(3);
        
        const set_adminRequest = await contract.methodsObject.set_admin(tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'));
        await set_adminRequest.confirmation(3);
        
        const balance_ofRequest = await contract.methodsObject.balance_of({
                requests: [{
                    owner: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                    token_id: tas.nat('42'),
                }],
                callback: tas.contract('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
            });
        await balance_ofRequest.confirmation(3);
        
        const transferRequest = await contract.methodsObject.transfer([{
                    from_: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                    txs: [{
                        to_: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                        token_id: tas.nat('42'),
                        amount: tas.nat('42'),
                    }],
                }]);
        await transferRequest.confirmation(3);
        
        const add_operatorRequest = await contract.methodsObject.add_operator({
                owner: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                operator: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                token_id: tas.nat('42'),
            });
        await add_operatorRequest.confirmation(3);
        
        const remove_operatorRequest = await contract.methodsObject.remove_operator({
                owner: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                operator: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                token_id: tas.nat('42'),
            });
        await remove_operatorRequest.confirmation(3);
        
        const burn_tokensRequest = await contract.methodsObject.burn_tokens([{
                    owner: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                    token_id: tas.nat('42'),
                    amount: tas.nat('42'),
                }]);
        await burn_tokensRequest.confirmation(3);
        
        const create_tokenRequest = await contract.methodsObject.create_token({
                token_id: tas.nat('42'),
                token_info: tas.map({ 
                    'VALUE': tas.bytes(char2Bytes('DATA')),
                }),
            });
        await create_tokenRequest.confirmation(3);
        
        const mint_tokensRequest = await contract.methodsObject.mint_tokens([{
                    owner: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                    token_id: tas.nat('42'),
                    amount: tas.nat('42'),
                }]);
        await mint_tokensRequest.confirmation(3);
        