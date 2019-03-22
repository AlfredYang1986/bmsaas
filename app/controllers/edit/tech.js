import Controller from '@ember/controller';
import { computed} from '@ember/object';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Controller.extend({
    bm_error_service: service(),

    provinces: A([{name: '北京'}]),
    citys: A([{name: '北京市'}]),
    areas: A([{name: '密云区'}, {name: '延庆区'}, {name: '朝阳区'}, {name: '丰台区'}, {name: '石景山区'}, {name: '海淀区'}, {name: '门头沟区'}, {name: '房山区'}, {name: '房山区'}, {name: '通州区'}, {name: '顺义区'}, {name: '昌平区'}, {name: '大兴区'}, {name: '怀柔区'}, {name: '平谷区'}, {name: '东城区'}, {name: '西城区'}]),

    sex_idx: 0,
    genderCheck: A(['男', '女']),
    sex: computed('sex_idx', function() {
        if(this.model.tech != null) {
            if(this.sex_idx == 1) {
                this.set('model.tech.gender', 0)
            } else if (this.sex_idx == 0) {
                this.set('model.tech.gender', 1)
            }
        }
    }),
    jobTypeIdx: 0,
    jobTypeCheck: A(['正职', '兼职']),
    jobType: computed('jobTypeIdx', function() {
        if(this.model.tech != null) {
            if(this.jobTypeIdx == 1) {
                this.set('model.tech.jobType', 0)
            } else if (this.jobTypeIdx == 0) {
                this.set('model.tech.jobType', 1)
            }
        }
    }),
    teachYearsArr:A([{name: 0}, {name: 1}, {name: 2}, {name: 3}, {name: 4}, {name: 5}, {name: 6}, {name: 7}, {name: 8}, {name: 9}, {name: 10}, {name: 11}, {name: 12}, {name: 13}, {name: 14}, {name: 15}, {name: 16}, {name: 17}, {name: 18}, {name: 19}, {name: 20}]),
    jobArr:A([{name: '校长'}, {name: '教务主任'}, {name: '课程顾问'}, {name: '教师'}]),

    actions: {
        cancelTechBtnClicked() {
            this.store.unloadRecord(this.model.tech);
            if (this.model.isPushing) {
                this.transitionToRoute("tech")
            } else {
                this.transitionToRoute("detail.tech", this.model.tech.id)
            }
        },
        saveTechBtnClicked() {
            // let that = this;
            this.model.tech.save().then(() => {
                // if (this.model.isPushing) {
                //     this.transitionToRoute("detail.tech", this.model.tech.id)
                // } else {
                this.transitionToRoute("detail.tech", this.model.tech.id)
                // }
            }, error => {
                this.bm_error_service.handleError(error)
            })

        },
        selectedYears() {
            let sel = document.getElementById("yearsSelect");
            if (sel.selectedIndex == "") {
                // this.set('model.tech.teachYears', 0);
                this.model.tech.set('teachYears', 0)
            } else {
                this.model.tech.set('teachYears', parseInt(sel.options[sel.selectedIndex].value));
                // this.set('model.tech.teachYears', parseInt(sel.options[sel.selectedIndex].value));
            }
        },
        selectedJob() {
            let sel = document.getElementById("jobSelect");
            if (sel.selectedIndex == "") {
                // this.set('model.tech.jobTitle', "");
                this.model.tech.set('jobTitle', "");
            } else {
                // this.set('model.tech.jobTitle', sel.options[sel.selectedIndex].value);
                this.model.tech.set('jobTitle', sel.options[sel.selectedIndex].value);
            }
        },
        onKeyPress() {
            let regex = new RegExp(/^[0-9]+(.[0-9]{2})?$/);
            if(regex.test(String.fromCharCode(event.keyCode))) {
                return;
            } else {
                if (event && event.preventDefault){
                    //非IE浏览器
                    event.preventDefault();
                } else {
                    //IE浏览器
                    window.event.returnValue = false;
                }
            }
        },
    },
});
