describe('dummy test for jest plugin testing', () => {
    test('1 test for jest', () => {
		try {
            expect(2).toEqual(2)
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});
});
