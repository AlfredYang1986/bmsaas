import Controller from '@ember/controller';
import { computed } from '@ember/object';

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
    },
    arrangedDate: computed(function(){
        if (this.model.cls != null || this.model.cls.get('start_date') == null) {
            return '没有安排';
        } else {
            let s = this.model.cls.get('start_date');
            let e = this.model.cls.get('end_date');
            return s.getFullYear() + '/' + (s.getMonth() + 1) + '/' + s.getDate() + 
                ' ---- ' + e.getFullYear() + '/' + (e.getMonth() + 1) + '/' + e.getDate()
        }
    }),
});
