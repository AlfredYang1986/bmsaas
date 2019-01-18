import Controller from '@ember/controller';
import { A } from '@ember/array';
import { computed } from '@ember/object';

export default Controller.extend({
    provinces: A(['北京']),
    citys: A(['北京市']),
    areas: A(["密云区", "延庆区", "朝阳区", "丰台区", "石景山区", "海淀区", "门头沟区", "房山区", "通州区", "顺义区", "昌平区", "大兴区", "怀柔区", "平谷区", "东城区", "西城区"]),

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
        // if(this.bm_stud_service.stud.Guardians.length > 0) {
        //     if(this.rela_idx == 0) {
        //         this.bm_stud_service.stud.Guardians[0].relation_ship = "爸爸"
        //     } else if(this.rela_idx == 1) {
        //         this.bm_stud_service.stud.Guardians[0].relation_ship = '妈妈'
        //     } else {
        //         this.bm_stud_service.stud.Guardians[0].relation_ship = '其他'
        //     }
        // }
    }),
    isPushing: false,
    origin:A([{name: '学员转介绍'}, {name: '电话推广'}, {name: '小程序'}, {name: '线下活动推广'}, {name: '其他'}]),

    actions: {
        saveInputBtnClicked() {
            this.model.stud.save();
        },
        selectedTech() {
            let sel = document.getElementById("techSelect");
            this.set('sel', sel)
            if (sel.selectedIndex == 0) {
                // this.set('bm_stud_service.stud.teacherName', null);
            } else {
                // this.set('bm_stud_service.stud.teacherName', sel.options[sel.selectedIndex].value);
            }
        },
        selectedOrigin() {
            let sel = document.getElementById("originSelect");
            if (sel.selectedIndex == 0) {
                model.stud.set('sourceWay', '');
                // this.set('bm_stud_service.stud.sourceWay', null);
            } else {
                model.stud.set('sourceWay', sel.options[sel.selectedIndex].value);
                // this.set('bm_stud_service.stud.sourceWay', sel.options[sel.selectedIndex].value);
            }
        }
    },
});
