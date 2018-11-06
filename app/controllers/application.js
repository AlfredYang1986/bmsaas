import Controller from '@ember/controller';

export default Controller.extend({
    init() {
        this._super(...arguments);
        this.get('cookie').write('token', 'ce6af788112b26331e9789b0b2606cce', { path: '/' });
    }
});
