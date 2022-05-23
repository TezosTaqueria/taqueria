
        const confirm_adminRequest = await contract.methodsObject.confirm_admin();
        await confirm_adminRequest.confirmation(3);
        
        const pauseRequest = await contract.methodsObject.pause(true);
        await pauseRequest.confirmation(3);
        
        const set_adminRequest = await contract.methodsObject.set_admin(tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'));
        await set_adminRequest.confirmation(3);
        
        const bidRequest = await contract.methodsObject.bid(tas.nat('42'));
        await bidRequest.confirmation(3);
        
        const cancelRequest = await contract.methodsObject.cancel(tas.nat('42'));
        await cancelRequest.confirmation(3);
        
        const configureRequest = await contract.methodsObject.configure({
                opening_price: tas.mutez('42'),
                min_raise_percent: tas.nat('42'),
                min_raise: tas.mutez('42'),
                round_time: tas.nat('42'),
                extend_time: tas.nat('42'),
                asset: [{
                    fa2_address: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                    fa2_batch: [{
                        token_id: tas.nat('42'),
                        amount: tas.nat('42'),
                    }],
                }],
                start_time: tas.timestamp(new Date()),
                end_time: tas.timestamp(new Date()),
            });
        await configureRequest.confirmation(3);
        
        const resolveRequest = await contract.methodsObject.resolve(tas.nat('42'));
        await resolveRequest.confirmation(3);
        