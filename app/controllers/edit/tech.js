import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { debug } from '@ember/debug';
import { computed} from '@ember/object';
import { A } from '@ember/array';

export default Controller.extend({
    bm_tech_service: service(),
    provinces: null,
    citys: null,
    areas: null,
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
        saveTechBtnClicked() {
            let that = this
            let callback = {
                onSuccess: function() {
                    that.transitionToRoute('tech');
                },
                onFail: function(/*err*/) {
                    debug('error');
                }
            }
            this.bm_tech_service.saveUpdate(callback);
        },
        selectedYears() {
            let sel = document.getElementById("yearsSelect");
            if (sel.selectedIndex == "") {
                this.set('model.tech.teachYears', 0);
            } else {
                this.set('model.tech.teachYears', parseInt(sel.options[sel.selectedIndex].value));
            }
        },
        selectedJob() {
            let sel = document.getElementById("jobSelect");
            if (sel.selectedIndex == "") {
                this.set('model.tech.jobTitle', "");
            } else {
                this.set('model.tech.jobTitle', sel.options[sel.selectedIndex].value);
            }
        }
    },
});
