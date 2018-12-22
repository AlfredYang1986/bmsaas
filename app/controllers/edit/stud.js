import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed} from '@ember/object';
import { A } from '@ember/array';
import { debug } from '@ember/debug';

export default Controller.extend({
    init() {
        this._super(...arguments);
        this.bm_tech_service.queryLocalMultiObject();
    },

    bm_stud_service: service(),
    bm_tech_service: service(),
    sex_idx: 0,
    rela_idx: 0,
    genderCheck: A(['男', '女', '未知']),
    relaChecked: A(['父亲', '母亲', '其他']),
    sex: computed('sex_idx', function() {
        if(this.bm_stud_service.stud != null) {
            if(this.sex_idx == 1) {
                this.set('bm_stud_service.stud.gender', 0)
            } else if(this.sex_idx == 0) {
                this.set('bm_stud_service.stud.gender', 1)
            } else {
                this.set('bm_stud_service.stud.gender', 3)
            }
        }
    }),
    rela: computed('rela_idx', function() {
        if(this.bm_stud_service.stud.Guardians.length > 0) {
            if(this.rela_idx == 0) {
                this.bm_stud_service.stud.Guardians[0].relation_ship = "爸爸"
            } else if(this.rela_idx == 1) {
                this.bm_stud_service.stud.Guardians[0].relation_ship = '妈妈'
            } else {
                this.bm_stud_service.stud.Guardians[0].relation_ship = '其他'
            }
        }

    }),

    isPushing: false,
    origin:A(['学员转介绍', '电话推广', '小程序', '线下活动推广', '其他']),

    actions: {
        saveInputBtnClicked() {
            // if(this.isPushing) {
                let that = this
                let callback = {
                    onSuccess: function(res) {
                        that.transitionToRoute('detail.stud', res.data.id);
                    },
                    onFail: function(/*err*/) {
                        debug('error');
                    }
                }
                this.bm_stud_service.saveUpdate(callback);
            // } else {
            //     let that = this
            //     let callback = {
            //         onSuccess: function(res) {
            //             that.transitionToRoute('detail.stud', res.data.id);
            //         },
            //         onFail: function(/*err*/) {
            //             debug('error');
            //         }
            //     }
            //     this.bm_stud_service.saveUpdate(callback);
            // }
        },
        selectedTech() {
            let sel = document.getElementById("techSelect");
            this.set('sel', sel)
            if (sel.selectedIndex == 0) {
                this.set('bm_stud_service.stud.teacherName', null);
            } else {
                this.set('bm_stud_service.stud.teacherName', sel.options[sel.selectedIndex].value);
            }
        },
        selectedOrigin() {
            let sel = document.getElementById("originSelect");
            if (sel.selectedIndex == 0) {
                this.set('bm_stud_service.stud.sourceWay', null);
            } else {
                this.set('bm_stud_service.stud.sourceWay', sel.options[sel.selectedIndex].value);
            }
        }
    },
});
