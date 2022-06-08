describe('dummy test for jest plugin testing', () => {
    test('1 test for jest', () => {
		try {
            expect(1).toEqual(1)
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});
});
