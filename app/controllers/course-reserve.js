import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        openReserve() {
            this.transitionToRoute('edit.course-reserve')
        }
    }
});
