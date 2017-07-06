import getId from '../getId';

describe('#getId', () => {
    it('should get unique ids', () => {
        let id;
        id = getId();
        expect(id).toBe(0);
        id = getId();
        expect(id).toBe(1);
    });
});
