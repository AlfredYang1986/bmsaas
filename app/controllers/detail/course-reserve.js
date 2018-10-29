import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        deleteDetail() {
            this.set('reserveDetail', false);
            this.set('deleteDetail', true);
        }
    }
});
