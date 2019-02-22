import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { computed } from '@ember/object';
import EmberObject from '@ember/object';


export default Controller.extend({

    toast: service(),
    toastOptions: EmberObject.create({
        closeButton: false,
        positionClass: 'toast-top-center',
        progressBar: false,
        timeOut: '2000',
    }),
    titles: A(['全部', '未排课', 'On Going', 'Finished']),
    openFlag: true,

    refreshFlag: false,

    addClassDlg: false,
    addSuccessDlg: false,
    noteError: false,
    noteCourseError: false,

    cur_course_id: "",
    tmpClass: null,
    classTitle: "",

    cur_idx: 0,
    cur_page: 1,
    cls: computed('cur_idx', 'cur_page', "refreshFlag", function(){
        // @sun 通过cur_idx 调整query的filter
        // return this.store.query('class', { 'page[number]': this.cur_page, 'page[size]': 20, "brand-id": localStorage.getItem("brandid"), "status": 2})
        if(this.cur_idx == 0) {
            return this.store.query('class', { "brand-id": localStorage.getItem("brandid"), "status": 2, "flag": 0})
        } else if(this.cur_idx == 1) {
            return this.store.query('class', { "brand-id": localStorage.getItem("brandid"), "status": 2, "flag": -1})
        } else if(this.cur_idx == 2) {
            return this.store.query('class', { "brand-id": localStorage.getItem("brandid"), "status": 2, "flag": 1})
        } else {
            return this.store.query('class', { "brand-id": localStorage.getItem("brandid"), "status": 2, "flag": 2})
        }
    }),

    actions: {
        onTabClicked(tabIdx) {
            // this.set('bm_class_service.page', 0)
            if (tabIdx == 0) {
                // this.bm_class_service.filterMultiObjects("all");
            } else if(tabIdx == 1) {
                // this.bm_class_service.filterMultiObjects("pre");
            } else if(tabIdx == 2) {
                // this.bm_class_service.filterMultiObjects("going");
            } else if(tabIdx == 3) {
                // this.bm_class_service.filterMultiObjects("finish");
            }
        },
        cardClicked(idx) {
            this.transitionToRoute('detail.classes', idx);
        },
        // createClass() {
        //     this.transitionToRoute('edit.classes')
        // }
        onAddClassClick() {
            this.set('addClassDlg', true);
            this.set("tmpClass", this.store.createRecord("class"))
        },
        cancelSuccessHandled() {
            this.set('addSuccessDlg', false);
        },
        cancelHandled() {
            this.set('classTitle', "");
            this.set('cur_course_id', "");
            this.tmpClass.unloadRecord();
            this.set('addClassDlg', false);
            this.set('noteError', false);
            this.set('noteCourseError', false);
        },
        successHandled() {
            if(this.classTitle == "" && this.cur_course_id == "") {
                this.set('noteError', true);
                this.set('noteCourseError', true);
                return;
            } else if (this.classTitle == "" && this.cur_course_id != "") {
                this.set('noteError', true);
                this.set('noteCourseError', false);
                return;
            } else if (this.classTitle != "" && this.cur_course_id == "") {
                this.set('noteCourseError', true);
                this.set('noteError', false);
                return;
            } else {
                this.set('noteCourseError', false);
                this.set('noteError', false);
            }

            let that = this;
            let onSuccess = function () {
                that.set('addClassDlg', false);
                that.set('classTitle', "");
                that.set('cur_course_id', "");
                that.store.unloadAll('class');
                that.toggleProperty("refreshFlag")
                that.toast.success('', '新增班级成功', that.toastOptions);
            }
            let onFail = function () {
                that.toast.error('', '新增班级失败', that.toastOptions);
            }
            this.tmpClass.save().then(() => {
                this.tmpClass.set("brandId", localStorage.getItem("brandid"))
                this.tmpClass.set("status", 2)
                this.tmpClass.set("classTitle", this.classTitle)
                this.tmpClass.set("sessioninfo", this.store.peekRecord("sessioninfo", this.cur_course_id))
                this.tmpClass.set("yard", this.model.yard)
                this.tmpClass.save().then(onSuccess, onFail)
            })

            // this.bm_class_service.resetInfoAndYard(this.bm_yard_service.yard.id, this.sessionId);
            // this.bm_class_service.resetTechs([]);
            // this.bm_class_service.resetAttendee([]);

            // if(this.classTitle == "" && this.cur_course_id == "") {
            //     this.set('noteError', true);
            //     this.set('noteCourseError', true);
            //     return;
            // } else if (this.classTitle == "" && this.cur_course_id != "") {
            //     this.set('noteError', true);
            //     this.set('noteCourseError', false);
            //     return;
            // } else if (this.classTitle != "" && this.cur_course_id == "") {
            //     this.set('noteCourseError', true);
            //     this.set('noteError', false);
            //     return;
            // } else {
            //     this.set('noteCourseError', false);
            //     this.set('noteError', false);
            // }

            // let that = this
            // let callback = {
            //     onSuccess: function() {
            //         that.set('addClassDlg', false);
            //         that.toast.success('', '添加班级成功', that.toastOptions);
            //         that.bm_class_service.set('refresh_all_token', that.bm_class_service.guid());
            //         debug('push sessionable success')
            //         that.set('addSuccessDlg', true);
            //         that.set('aaa', true);
            //     },
            //     onFail: function() {
            //         that.toast.error('', '添加班级失败', that.toastOptions);
            //         debug('push sessionable fail')
            //     }
            // }
            // this.bm_class_service.saveUpdate(callback);
        },
        onAddSuccess() {
            // this.set('addSuccessDlg', false);
            // this.transitionToRoute("detail.classes", this.bm_class_service.sessionableId)
        },
    },
    generateClass() {
        if (this.addClassDlg == true) {
            // this.bm_class_service.set('classId', 'class/push');
            // this.bm_class_service.queryClass();
        }
    }
});
