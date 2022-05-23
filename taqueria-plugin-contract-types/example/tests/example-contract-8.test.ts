
        const makeRequest = await contract.methodsObject.make({
                id: tas.nat('42'),
                p1: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
                fee: tas.mutez('42'),
                otherFee?: tas.mutez('42'),
            });
        await makeRequest.confirmation(3);
        
        const joinRequest = await contract.methodsObject.join(tas.nat('42'));
        await joinRequest.confirmation(3);
        
        const register2Request = await contract.methodsObject.register2({
                id: tas.nat('42'),
                p2: tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
            });
        await register2Request.confirmation(3);
        
        const acceptRequest = await contract.methodsObject.accept({
                id: tas.nat('42'),
                result: (
                    { result1: undefined }
                    | { result2: undefined }
                    | { ok: undefined }
                ),
            });
        await acceptRequest.confirmation(3);
        
        const cancelRequest = await contract.methodsObject.cancel(tas.nat('42'));
        await cancelRequest.confirmation(3);
        
        const setAuthRequest = await contract.methodsObject.setAuth(tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'));
        await setAuthRequest.confirmation(3);
        
        const confirmAuthRequest = await contract.methodsObject.confirmAuth();
        await confirmAuthRequest.confirmation(3);
        
        const setCollectorRequest = await contract.methodsObject.setCollector(tas.address('tz1ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'));
        await setCollectorRequest.confirmation(3);
        
        const freeRequest = await contract.methodsObject.free();
        await freeRequest.confirmation(3);
        