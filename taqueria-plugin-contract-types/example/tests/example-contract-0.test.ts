
        const decrementRequest = await contract.methodsObject.decrement(tas.int('42'));
        await decrementRequest.confirmation(3);
        
        const incrementRequest = await contract.methodsObject.increment(tas.int('42'));
        await incrementRequest.confirmation(3);
        
        const resetRequest = await contract.methodsObject.reset();
        await resetRequest.confirmation(3);
        