import Controller from '@ember/controller';

export default Controller.extend({
    arrangeClass: true,
    classDetails: false,
    traineesLists: false,
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
        traineesLists() {
            this.set('arrangeClass', false);
            this.set('classDetails', false);
            this.set('traineesLists', true);
        },
        goToarrangeClass() {
            this.transitionToRoute('arrange-class');
        }
    }
});
