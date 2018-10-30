import Controller from '@ember/controller';

export default Controller.extend({
    // listInputs: [],
    // selectSort: true,
    noSortChoose: true,
    experience: false,
    activity: false,
    // selectTitle: false,
    // experContent: false,

    gainsInputArray: null,
    offeredInputArray: null,
    neededInputArray: null,

    radioisChecked: false,
    allRadioisChecked: false,
    isCheckAgeInput: true,

    selectNav: 0,

    age_range: '',
    
    actions: {
        rangeRadioClick(values) {
            this.set('isCheckAgeInput', false);
            this.set('allRadioisChecked', false);
            this.set('radioisChecked', true);
            this.set('age_range', this.age_range);
        },
        allRangeRadioClick(values) {
            this.set('allRadioisChecked', true);
            this.set('isCheckAgeInput', true);
            this.set('radioisChecked', false);
            this.set('age_range', "");
            this.set('act_alb', 0);
            this.set('act_aub', 0);
        },
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
        setCat(cat) {
            this.set('act_cat', cat);
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
        },
        sortNext() {
            this.set('selectNav', this.selectNav + 1);
        },
        titleNext() {
            if (!this.activityValidate1()) {
                alert('something wrong!');
                return;
            }
            this.set('act_alb', parseInt(this.age_range.split('-')[0]));
            this.set('act_aub', parseInt(this.age_range.split('-')[1]));

            this.set('selectNav', this.selectNav + 1);
        },
        contentNext() {
            if (!this.activityValidate2()) {
                alert('something wrong!');
                return;
            }
            this.set('selectNav', this.selectNav + 1);
        },
        interactiveNext() {
            if (!this.activityValidate3()) {
                alert('something wrong!');
                return;
            }
            this.set('selectNav', this.selectNav + 1);
        },
        rewardNext() {
            this.set('selectNav', this.selectNav + 1);
        },
        addPhotosNext() {
            this.set('selectNav', this.selectNav + 1);
        },
        offerGoodsNext() {
            this.set('selectNav', this.selectNav + 1);
        },
        comeWithNext() {
            this.set('selectNav', this.selectNav + 1);
        },
        noticeNext() {
            this.set('selectNav', this.selectNav + 1);
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
            act.set('cat', this.act_cat);
            act.set('length', this.act_length);
            act.set('planning', this.act_planning);
            act.set('description', this.act_des);
            act.set('ccontent', this.act_content);
            act.set('alb', this.act_alb);
            act.set('aub', this.act_aub);
            // act.set('gains', this.act_gains);
            act.set('cover', this.act_cover);
            act.set('imgs', this.act_imgs);
            // act.set('offered', this.act_offered);
            // act.set('needed', this.act_needed);
            act.set('notice', this.act_notice);

            act.set('gains', this.gainsInputArray);
            act.set('offered', this.offeredInputArray);
            act.set('needed', this.neededInputArray);

            if (this.isPushing) {
                this.transitionToRoute('experienceOpen');
            } else {
                this.transitionToRoute('detail.experience', act.id);
            }
            this.set('modal4', true);
        },
        
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
    // act_gains: [],
    act_cover: '',
    act_imgs: [],
    // act_offered: [],
    // act_needed: [],
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
