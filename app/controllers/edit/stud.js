import Controller from '@ember/controller';
// import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
    init() {
        this._super(...arguments);
        this.bm_tech_service.queryLocalMultiObject();
    },

    bm_stud_service: service(),
    bm_tech_service: service(),

    genderCheck: ['男', '女'],
    isPushing: false,
    origin:['学员转介绍', '电话推广', '小程序', '闲暇活动推广', '其他'],

    actions: {
        saveInputBtnClicked() {
            if(this.isPushing) {
                let that = this
                let callback = {
                    onSuccess: function(res) {
                        that.transitionToRoute('detail.stud', res.data.id);
                    },
                    onFail: function(err) {
                        console.log('error');
                    }
                }
                this.bm_stud_service.saveUpdate(callback);
            } else {
                let that = this
                let callback = {
                    onSuccess: function(res) {
                        that.transitionToRoute('detail.stud', res.data.id);
                    },
                    onFail: function(err) {
                        console.log('error');
                    }
                }
                this.bm_stud_service.saveUpdate(callback);
            }
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
