import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
    mock_data: service(),

    cur_page_idx: 0,

    crs_name: '',
    crs_alb: 0,
    crs_aub: 0,
    crs_level: '',
    crs_count: 0,
    crs_length: 0,
    crs_cat: '',
    crs_subcat: '',
    crs_target: '',
    crs_plan: '',
    crs_content: '',
    crs_imgs: [],
    crs_tags: [],

    isPushing: false,
    refresh_token: 'start-data',

    cat_candi: computed(function(){
        return this.mock_data.queryCateCandidate();
    }),

    sub_candi: computed('crs_cat', function(){
        return this.mock_data.querySubCatCondidate(this.crs_cat);
    }),

    cat_refresh: computed('refresh_token', function(){
        let sel = document.getElementById('catselected');
        for (let idx = 0; idx < sel.options.length; idx++) {
            if (sel.options[idx].value == this.get('crs_cat')) {
                sel.selectedIndex = idx;
            }
        }

        {
            let sel = document.getElementById('subselected');
            for (let idx = 0; idx < sel.options.length; idx++) {
                if (sel.options[idx].value == this.get('crs_subcat')) {
                    sel.selectedIndex = idx;
                }
            }
        }
        return '';
    }),

    actions: {
        saveCourseBtnClicked() {
            console.log('save course editing')
            // if (!this.courseValidate()) {
            //     alert('something wrong !')
            //     return;
            // }

            let course = null;
            if(this.isPushing) {
                course = this.get('pmController').get('Store').createModel('bm-session-info', {
                    id: this.guid(),
                    title: this.crs_name,
                    alb: this.crs_alb,
                    aub: this.crs_aub,
                    level: this.crs_level,
                    count: this.crs_count,
                    length: this.crs_length,
                    description: this.crs_content,
                    subtitle: "天空之城",
                    harvest: "此课程的好处",
                    acquisition: "奖品",
                    accompany: 2,
                    including: "有小板凳",
                    carrying: "自带水浒",
                    notice: "前方高能",
                    Cate: this.get('pmController').get('Store').createModel('bm-category', {
                        id: this.guid(),
                        title: this.crs_cat,
                        subtitle: this.crs_subcat,
                    })
                })
                let json = this.get('pmController').get('Store').object2JsonApi(course);
                this.get('logger').log(json);

                this.get('pmController').get('Store').transaction('/api/v1/pushsessioninfo/0', 'bm-session-info', json)
                    .then(data => {
                        this.get('logger').log(data)
                    })
                    .catch(data => {
                        this.get('logger').log(data);
                    })
            }
            else {
                course = this.model.course;
            }
            // if (this.isPushing) {
            //     course = this.store.createRecord('bmcourseinfo', {
            //         id: this.guid()
            //     })
            //     let cat = this.store.createRecord('bmcat', {
            //         id: this.guid()
            //     })
            //     course.set('category', cat);
            //
            // } else {
            //     course = this.model.course;
            // }

            // course.set('name', this.crs_name);
            // course.set('level', this.crs_level);
            // course.set('count', this.crs_count);
            // course.set('length', this.crs_length);
            // course.set('tags', this.crs_tags);
            // course.set('target', this.crs_target);
            // course.set('planning', this.crs_plan);
            // course.set('ccontent', this.crs_content);
            //
            // let cat = course.get('category');
            // cat.set('cat', this.crs_cat);
            // cat.set('sub', this.crs_subcat);
            // course.set('category', cat);
            //
            // course.set('alb', this.crs_alb);
            // course.set('aub', this.crs_aub);

            if (this.isPushing) {
                this.transitionToRoute('course');
            } else {
                this.transitionToRoute('detail.course', course.id);
            }
        },
        reserveCourse() {
            this.transitionToRoute('courseReserve');
        },
        catChanged() {
            let sel = document.getElementById('catselected');
            this.set('crs_cat', sel.options[sel.selectedIndex].value);
            this.get('logger').log(this.crs_cat);
        },
        subChanged() {
            let sel = document.getElementById('subselected');
            this.set('crs_subcat', sel.options[sel.selectedIndex].value);
        }

    },

    courseValidate() {

        return (this.crs_name.length == 0 ||
          this.crs_level.length == 0 ||
          this.crs_count > 0 ||
          this.crs_length > 0 ||
          this.crs_tags.length == 0 ||
          this.crs_target.length == 0 ||
          this.crs_plan.length == 0 ||
          this.crs_cat.length == 0 ||
          this.crs_subcat.length == 0 ||
          this.crs_content.length == 0)
    },

    guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
});
