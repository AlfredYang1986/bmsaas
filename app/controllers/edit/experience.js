import Controller from '@ember/controller';

export default Controller.extend({
    // listInputs: [],
    selectSort: true,
    noSortChoose: true,
    experience: false,
    activity: false,
    selectTitle: false,
    experContent: false,

    gainsInputArray: null,
    offeredInputArray: null,
    neededInputArray: null,
    
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
            if (!this.activityValidate1()) {
                alert('something wrong!');
                return;
            }
            this.set('selectTitle', false);
            this.set('experContent', true);
        },
        contentNext() {
            if (!this.activityValidate2()) {
                alert('something wrong!');
                return;
            }
            this.set('experContent', false);
            this.set('childInteractive', true);
        },
        interactiveNext() {
            if (!this.activityValidate3()) {
                alert('something wrong!');
                return;
            }
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

            // if (!this.activityValidate()) {
            //     alert('something wrong!');
            //     return;
            // }

            let act = null;
            if (this.isPushing) {
                act = this.store.createRecord('bmactivityinfo', {
                    id: this.guid()
                })
            } else {
                act = this.model.act;
            }

            // TODO: 其他的一些属性修改都在这里解决
            act.set('name', this.act_name);

            act.set('gains', this.gainsInputArray);
            act.set('offered', this.offeredInputArray);
            act.set('needed', this.neededInputArray);
            
            // TODO: 其他的一些属性修改都在这里解决
            act.set('length', this.act_length);
            act.set('planning', this.act_planning);
            act.set('description', this.act_des);
            act.set('ccontent', this.act_content);
            // act.set('alb', this.act_alb);
            // act.set('aub', this.act_aub);
            // act.set('gains', this.act_gains);
            // act.set('cover', this.act_cover);
            // act.set('imgs', this.act_imgs);
            // act.set('offered', this.act_offered);
            // act.set('needed', this.act_needed);
            // act.set('notice', this.act_notice);

            if (this.isPushing) {
                this.transitionToRoute('experience');
            } else {
                this.transitionToRoute('detail.experience', act.id);
            }
        },
        gainsInputs(data) {
            let darry = data.map(e => e.text)
            this.set('gainsInputArray', darry);
            // this.model.act.set('gains', darry)
            // window.console.info(this.model.act.gains)
        },
        offeredInputs(data) {
            let darry = data.map(e => e.text)
            this.set('offeredInputArray', darry);
            // this.model.act.set('offered', darry)
            // window.console.info(this.model.act.offered)
        },
        neededInputs(data) {
            let darry = data.map(e => e.text)
            this.set('neededInputArray', darry);
            // this.model.act.set('needed', darry)
            // window.console.info(this.model.act.needed)
        }
    },

    isPushing: false,

    act_cat: '',
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
    },

    activityValidate1() {
        let valiFlag = true;
        if (this.act_name.length == 0 ||
          this.act_length.length == 0) {
          valiFlag = false;
        }
        return valiFlag;
    },

    activityValidate2() {
        let valiFlag = true;
        if (this.act_planning.length == 0 ||
          this.act_des.length == 0) {
          valiFlag = false;
        }
        return valiFlag;
    },

    activityValidate3() {
        let valiFlag = true;
        if (this.act_content.length == 0) {
          valiFlag = false;
        }
        return valiFlag;
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
