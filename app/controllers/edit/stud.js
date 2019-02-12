import Controller from '@ember/controller';
import { A } from '@ember/array';
import { computed } from '@ember/object';

export default Controller.extend({
    provinces: A(['北京']),
    citys: A(['北京市']),
    areas: A(["密云区", "延庆区", "朝阳区", "丰台区", "石景山区", "海淀区", "门头沟区", "房山区", "通州区", "顺义区", "昌平区", "大兴区", "怀柔区", "平谷区", "东城区", "西城区"]),

    cur_tech_id: "",
    sex_idx: 0,
    rela_idx: 0,
    genderCheck: A(['男', '女']),
    relaChecked: A(['父亲', '母亲', '其他']),
    init() {
        this._super(...arguments);
        this.set('sex_idx', 0);
        this.set('rela_idx', 0);
    },
    sex: computed('sex_idx', function() {
        if(this.sex_idx == 1) {
            this.model.stud.set('gender', 0);
        } else {
            this.model.stud.set('gender', 1);
        }
    }),

    rela: computed('rela_idx', function() {
        if(this.model.stud.guardians.length > 0) {
            if(this.rela_idx == 0) {
            this.model.stud.guardians.objectAt(0).set("relationShip", "爸爸")
        } else if(this.rela_idx == 1) {
            this.model.stud.guardians.objectAt(0).set("relationShip", '妈妈')
        } else {
            this.model.stud.guardians.objectAt(0).set("relationShip", '其他')
        }
        }
    }),

    origin:A([{name: '学员转介绍'}, {name: '电话推广'}, {name: '小程序'}, {name: '线下活动推广'}, {name: '其他'}]),

    actions: {
        cancelInputBtnClicked() {
            let that = this
            if(this.model.applyid != undefined) {
                that.model.stud.deleteRecord();
                that.model.stud.save();
                that.transitionToRoute("inbox")
            } else {
                this.store.unloadRecord(this.model.stud);
                if (this.model.isPushing) {
                    this.transitionToRoute("stud")
                } else {
                    this.transitionToRoute("detail.stud", this.model.stud.id)
                }
            }

        },
        saveInputBtnClicked() {
            let that = this;
            if(this.model.stud.gender == undefined || this.model.stud.gender == null) {
                that.model.stud.set('gender', 1);
            }
            let tmpTech = null;
            if(that.cur_tech_id != null) {
                tmpTech = that.store.peekRecord("teacher", that.cur_tech_id);
            } else {
                tmpTech = that.model.techs.objectAt(0)
            }
            that.model.stud.set('teacher', tmpTech);
            for(let idx = 0;idx < that.model.stud.guardians.length;idx++) {
                that.model.stud.guardians.objectAt(idx).save()
            }
            that.model.stud.save((res) => {
                if (that.model.isPushing) {
                    if(that.model.stud.guardians.firstObject.relationShip == '') {
                        that.model.stud.guardians.objectAt(0).set("relationShip", '爸爸')
                    }
                    that.transitionToRoute("detail.stud", that.model.stud.id)
                } else {
                    if(that.model.applyid != undefined) {
                        let onSuccess = function(res) {
                            let apply = res;
                            apply.set('status', 1);
                            apply.save();
                        }
                        let onFail = function() {}
                        that.store.find('apply', that.model.applyid).then(onSuccess, onFail)
                    }
                    that.transitionToRoute("detail.stud", that.model.stud.id)
                }
            }).catch(err => window.console.info(err))
        },
        selectedOrigin() {
            let sel = document.getElementById("originSelect");
            if (sel.selectedIndex == 0) {
                this.model.stud.set('sourceWay', '');
                // this.set('bm_stud_service.stud.sourceWay', null);
            } else {
                this.model.stud.set('sourceWay', sel.options[sel.selectedIndex].value);
                // this.set('bm_stud_service.stud.sourceWay', sel.options[sel.selectedIndex].value);
            }
        }
    },
});
