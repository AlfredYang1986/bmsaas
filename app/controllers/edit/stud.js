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
    genderCheck: A(['男', '女', '未知']),
    relaChecked: A(['父亲', '母亲', '其他']),
    sex: computed('sex_idx', function() {
        if(this.sex_idx == 1) {
            this.model.stud.set('gender', 0);
        } else if(this.sex_idx == 0) {
            this.model.stud.set('gender', 1);
        } else {
            this.model.stud.set('gender', 3);
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
            let tmpTech = null;
            if(this.cur_tech_id != null) {
                tmpTech = this.store.peekRecord("teacher", this.cur_tech_id);
            } else {
                tmpTech = this.model.techs.objectAt(0)
            }
            this.model.stud.set('teacher', tmpTech);
            for(let idx = 0;idx < this.model.stud.guardians.length;idx++) {
                this.model.stud.guardians.objectAt(idx).save()
            }
            this.model.stud.save();
            if(this.model.applyid != undefined) {
                let onSuccess = function(res) {
                    let apply = res;
                    apply.set('status', 1);
                    apply.save();
                }
                let onFail = function() {}
                that.store.find('apply', that.model.applyid).then(onSuccess, onFail)
            }
            if (this.model.isPushing) {
                this.transitionToRoute("stud")
            } else {
                this.transitionToRoute("detail.stud", this.model.stud.id)
            }

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
