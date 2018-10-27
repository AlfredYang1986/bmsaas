import Controller from '@ember/controller';

export default Controller.extend({
    selectSort: true,
    noSortChoose: true,
    experience: false,
    activity: false,
    selectTitle: false,
    actions: {
        activitySort() {
            this.set('noSortChoose', false);
            this.set('experience', false);
            this.set('activity', true);
        },
        experienceSort() {
            this.set('noSortChoose', false);
            this.set('experience', true);
            this.set('activity', false);
        },
        sortNext() {
            this.set('selectSort', false);
            this.set('selectTitle', true);
        }
    }
});
