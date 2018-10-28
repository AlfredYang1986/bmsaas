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
    crs_content: '',
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
        return this.crs_name.length != 0;
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
