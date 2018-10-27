import Controller from '@ember/controller';

export default Controller.extend({
    selectSort: true,
    noSortChoose: true,
    experience: false,
    activity: false,
    selectTitle: false,
    experContent: false,
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
        },
        titleNext() {
            this.set('selectTitle', false);
            this.set('experContent', true);
        },
        contentNext() {
            this.set('experContent', false);
            this.set('childInteractive', true);
        },
        interactiveNext() {
            this.set('childInteractive', false);
            this.set('childReward', true);
        },
        rewardNext() {
            this.set('childReward', false);
            this.set('addPhotos', true);
        },
        addPhotosNext() {
            this.set('addPhotos', false);
            this.set('offerGoods', true);
        },
        offerGoodsNext() {
            this.set('offerGoods', false);
            this.set('comeWith', true);
        },
        comeWithNext() {
            this.set('comeWith', false);
            this.set('notice', true);
        }
    }
});
