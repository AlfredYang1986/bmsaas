import Controller from '@ember/controller';

export default Controller.extend({
    enteredSite: true,
    otherSite: false,
    actions: {
        enteredSite() {
            this.set('enteredSite', true);
            this.set('otherSite', false)
        },
        otherSite() {
            this.set('otherSite', true);
            this.set('enteredSite', false);
        }
    }
});
