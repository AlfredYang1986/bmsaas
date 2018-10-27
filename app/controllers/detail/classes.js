import Controller from '@ember/controller';

export default Controller.extend({
    arrangeClass: true,
    actions: {
        arrangeClass() {
            this.set('arrangeClass', true);
            this.set('classDetails', false);
            this.set('traineesLists', false);
        },
        classDetails() {
            this.set('arrangeClass', false);
            this.set('classDetails', true);
            this.set('traineesLists', false);
        },
    }
});
