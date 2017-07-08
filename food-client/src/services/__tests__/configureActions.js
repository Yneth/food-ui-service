import configureActions from '../configureActions';

describe('#configureActions', () => {
    let configureAction;

    beforeEach(() => {
        configureAction = configureActions('PREFIX/');
    });

    it('should have type', () => {
        const creator = configureAction('TYPE');

        expect(creator.type).toBe('PREFIX/TYPE');
    });

    it('should create actions with type', () => {
        const creator = configureAction('TYPE');

        expect(creator().type).toBe('PREFIX/TYPE');
    });

    it('should create actions with payload', () => {
        const creator = configureAction('TYPE');
        const payload = { msg1: 'hello', msg2: 'world' };

        expect(creator(payload).payload).toEqual(payload);
    });

    it('should intercept payload creation', () => {
        const creator = configureAction('TYPE', payload => ({ msg: payload.msg1 }));
        const payload = { msg1: 'hello', msg2: 'world' };

        expect(creator(payload).payload).toEqual({ msg: 'hello' });
    });
});
