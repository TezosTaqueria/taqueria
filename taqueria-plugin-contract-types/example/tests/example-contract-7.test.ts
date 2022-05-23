
        const confirm_adminRequest = await contract.methodsObject.confirm_admin();
        await confirm_adminRequest.confirmation(3);
        
        const pauseRequest = await contract.methodsObject.pause(true);
        await pauseRequest.confirmation(3);
        
        const set_adminRequest = await contract.methodsObject.set_admin(tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'));
        await set_adminRequest.confirmation(3);
        
        const buyRequest = await contract.methodsObject.buy({
                sale_seller: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                token_for_sale_address: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                token_for_sale_token_id: tas.nat('42'),
                money_token_address: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                money_token_token_id: tas.nat('42'),
            });
        await buyRequest.confirmation(3);
        
        const mintRequest = await contract.methodsObject.mint([{
                    token_metadata: {
                        token_id: tas.nat('42'),
                        token_info: tas.map({ 
                            'VALUE': tas.bytes(char2Bytes('DATA')),
                        }),
                    },
                    owner: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                }]);
        await mintRequest.confirmation(3);
        
        const sellRequest = await contract.methodsObject.sell({
                sale_price: tas.nat('42'),
                token_for_sale_address: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                token_for_sale_token_id: tas.nat('42'),
                money_token_address: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                money_token_token_id: tas.nat('42'),
            });
        await sellRequest.confirmation(3);
        