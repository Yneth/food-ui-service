import classNames from '../classNames';

describe('#classNames', () => {
    it('should handle string arguments', () => {
        const className = classNames('class1', 'class2', 'class3');
        expect(className).toBe('class1 class2 class3');
    });

    it('should handle array argument', () => {
        const className = classNames(['class1', null, 'class3']);
        expect(className).toBe('class1 class3');
    });

    it('should handle object argument', () => {
        const className = classNames({ class1: true, class2: false, class3: true });
        expect(className).toBe('class1 class3');
    });

    it('should handle mixed arguments', () => {
        const className = classNames('class1', ['class2'], { class3: true });
        expect(className).toBe('class1 class2 class3');
    });
});
