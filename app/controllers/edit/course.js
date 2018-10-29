import Controller from '@ember/controller';

export default Controller.extend({

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
    crs_ccontent: '',
    crs_imgs: [],
    crs_tags: [],

    isPushing: false,

    actions: {
        saveCourseBtnClicked() {
            console.log('save course editing')
            if (!this.courseValidate()) {
                alert('something wrong !')
                return;
            }

            let course = null;
            if (this.isPushing) {
                course = this.store.createRecord('bmcourseinfo', {
                    id: this.guid()
                })
            } else {
                course = this.model.course;
            }

            course.set('name', this.crs_name);
            course.set('level', this.crs_level);
            course.set('count', this.crs_count);
            course.set('length', this.crs_length);
            course.set('tags', this.crs_tags);
            course.set('target', this.crs_target);
            course.set('planning', this.crs_plan);
            course.set('ccontent', this.crs_ccontent);
            // TODO: 其他一些属性的修改

            if (this.isPushing) {
                this.transitionToRoute('course');
            } else {
                this.transitionToRoute('detail.course', course.id);
            }
        },
        reserveCourse() {
            this.transitionToRoute('courseReserve');
        }
    },
    
    courseValidate() {
        let valiFlag = true;
        if (this.crs_name.length == 0 ||
          this.crs_level.length == 0 ||
          this.crs_count.length == 0 ||
          this.crs_length.length == 0 ||
          this.crs_tags.length == 0 ||
          this.crs_target.length == 0 ||
          this.crs_plan.length == 0 ||
          this.crs_ccontent.length == 0) {
          valiFlag = false;
        }
        return valiFlag;
        // return this.crs_name.length != 0;
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
