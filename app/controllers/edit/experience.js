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
        },
        noticeNext() {
            this.set('notice', false);
            this.set('costExplain', true);
        },
        gotoExperience() {
            this.transitionToRoute('experienceOpen');
        },
        checkDetail() {
            this.transitionToRoute('experienceOpen');
        },
        saveActivityBtnClicked() {
            console.log('save the activity');

            if (!this.activityValidate()) {
                alert('something wrong!');
                return;
            }

            let act = null;
            if (this.isPushing) {
                act = this.store.createRecord('bmactivityinfo', {
                    id: this.guid()
                })
            } else {
                act = this.model.act;
            }

            act.set('name', this.act_name);
            // TODO: 其他的一些属性修改都在这里解决

            if (this.isPushing) {
                this.transitionToRoute('experience');
            } else {
                this.transitionToRoute('detail.experience', act.id);
            }
        }
    },

    isPushing: false,

    act_name: '',
    act_alb: 0,
    act_aub: 1,
    act_length: 0,
    act_des: '',
    act_planning: '',
    act_content: '',
    act_gains: [],
    act_cover: '',
    act_imgs: [],
    act_offered: [],
    act_needed: [],
    act_notice: '',

    activityValidate() {
        return this.act_name.length != 0;
    },

    guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

});
