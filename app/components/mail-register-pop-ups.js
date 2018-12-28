import Component from '@ember/component';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';

export default Component.extend({
    init() {
        this._super(...arguments);
        this.bm_tech_service.queryLocalMultiObject();
        debugger
        if(this.apply.kid.gender == 0) {
            this.set('sex_idx', 1)
        } else if(this.apply.kid.gender == 1) {
            this.set('sex_idx', 0)
        } else {
            this.set('sex_idx', 2)
        }
        if(this.apply.kid.guardian_role == "爸爸") {
            this.set('rela_idx', 0)
        } else if(this.apply.kid.guardian_role == "妈妈") {
            this.set('rela_idx', 1)
        } else {
            this.set('rela_idx', 2)
        }
    },

    bm_tech_service: service(),
    sex_idx: 0,
    rela_idx: 0,
    genderCheck: A(['男', '女', '未知']),
    relaChecked: A(['父亲', '母亲', '未知']),
    sex: computed('sex_idx', function() {
        if(this.sex_idx == 1) {
            this.set('apply.kid.gender', 0)
        } else if(this.sex_idx == 0) {
            this.set('apply.kid.gender', 1)
        } else {
            this.set('apply.kid.gender', 2)
        }

    }),
    rela: computed('rela_idx', function() {
        if(this.rela_idx == 0) {
            this.set('apply.kid.guardian_role', "爸爸")
        } else if(this.rela_idx == 1) {
            this.set('apply.kid.guardian_role', "妈妈")
        } else {
            this.set('apply.kid.guardian_role', "其他")
        }
    }),
    origin: ['学员转介绍', '电话推广', '小程序', '线下活动推广', '其他'],
    positionalParams: ['apply',],
    actions: {
        selectedTech() {
            let sel = document.getElementById("techSelect");
            this.set('sel', sel)
            if (sel.selectedIndex == 0) {
                this.set('apply.kid.teacherName', null);
            } else {
                this.set('apply.kid.teacherName', sel.options[sel.selectedIndex].value);
            }
        },
        selectedOrigin() {
            let sel = document.getElementById("originSelect");
            if (sel.selectedIndex == 0) {
                this.set('apply.kid.sourceWay', null);
            } else {
                this.set('apply.kid.sourceWay', sel.options[sel.selectedIndex].value);
            }
        },
        radioSelect() {
            debugger
        }
    }
});
