import Controller from '@ember/controller';
import { computed} from '@ember/object';
import { A } from '@ember/array';

export default Controller.extend({
    provinces: A(['北京']),
    citys: A(['北京市']),
    areas: A(["密云区", "延庆区", "朝阳区", "丰台区", "石景山区", "海淀区", "门头沟区", "房山区", "通州区", "顺义区", "昌平区", "大兴区", "怀柔区", "平谷区", "东城区", "西城区"]),

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
    jobArr:A([{name: '校長'}, {name: '教務主任'}, {name: '課程顧問'}, {name: '教師'}]),

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
            let that = this;
            this.model.tech.save().then((res) => {
                if (that.model.isPushing) {
                    that.transitionToRoute("detail.tech", that.model.tech.id)
                } else {
                    that.transitionToRoute("detail.tech", that.model.tech.id)
                }
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
        }
    },
});
