import Controller from '@ember/controller';
import { A } from '@ember/array';

export default Controller.extend({
    sex_idx: 0,
    rela_idx: 0,
    genderCheck: A(['男', '女', '未知']),
    relaChecked: A(['父亲', '母亲', '其他']),
    sex: 0, 
    rela: 'fuck',
    isPushing: false,
    origin:A([{name: '学员转介绍'}, {name: '电话推广'}, {name: '小程序'}, {name: '线下活动推广'}, {name: '其他'}]),

    actions: {
        saveInputBtnClicked() {

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
