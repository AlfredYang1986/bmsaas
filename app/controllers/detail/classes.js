import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { computed } from '@ember/object';

export default Controller.extend({
    toast: service(),
    toastOptions: {
        closeButton: false,
        positionClass: 'toast-top-center',
        progressBar: false,
        timeOut: '2000',
    },

    jobDuty: A([{name:'主讲'}, {name:'助教'}]),
    classTitle: "",
    cur_course_id: "",

    // TODO: 用ember-data 做
    addTechId: "",
    addJobDuty: "",
    tmpTech: null,
    tmpStud: null,
    tmpUnit: null,
    selectedStuds: null,

    cur_idx: 0,
    // sessions: computed(function(){
    //     // TODO : 这里为啥是reservalbeitem， 问产品
    //     // return this.store.findAll('reservableitem');
    //     return this.store.findAll('sessioninfo');
    // }),
    // techs: computed(function(){
    //     return this.store.findAll('teacher');
    // }),

    editClassDlg: false,
    deleteClassDlg: false,
    addTechDlg: false,
    addStudDlg: false,
    addArrClassDlg: false,
    removeTechDlg: false,
    removeStudDlg: false,
    removeUnitDlg: false,

    noteError: false,

    actions: {

        onRemoveArrcourseClick(param) {
            this.set('tmpUnit', param);
            this.set('removeUnitDlg', true);
        },
        onRemoveArrcourseClickOk() {
            let that = this;
            let onSuccess = function () {
                that.tmpUnit.deleteRecord();
                that.tmpUnit.save().then(() => {
                    window.console.log('213');

                    that.set('removeUnitDlg', false);
                    that.set('tmpUnit', null);
                    that.toast.success('', '移除课程安排成功', that.toastOptions);
                })

            }
            let onFail = function () {
                that.toast.error('', '移除课程安排失败', that.toastOptions);
            }
            this.model.class.units.removeObject(this.tmpUnit)
            console.log(this.model.class.units)
            debugger
            this.model.class.save().then(onSuccess, onFail)
        },
        onRemoveStudClick(param) {
            this.set('tmpStud', param);
            this.set('removeStudDlg', true);
        },
        onRemoveStudClickOk() {
            let that = this;
            let onSuccess = function () {
                that.set('removeStudDlg', false);
                that.set('tmpStud', null);
                that.toast.success('', '移除学生成功', that.toastOptions);
            }
            let onFail = function () {
                that.toast.error('', '移除学生失败', that.toastOptions);
            }
            this.model.class.students.removeObject(this.tmpStud)
            this.model.class.save().then(onSuccess, onFail)
        },
        onRemoveTeacherClick(param) {
            this.set('tmpTech', param);
            this.set('removeTechDlg', true);
        },
        onRemoveTeacherClickOk() {
            let that = this;
            let onSuccess = function () {
                that.set('removeTechDlg', false);
                that.set('tmpTech', null);
                that.toast.success('', '移除老师成功', that.toastOptions);
            }
            let onFail = function () {
                that.toast.error('', '移除老师失败', that.toastOptions);
            }
            this.model.class.teachers.removeObject(this.tmpTech)
            this.model.class.save().then(onSuccess, onFail)
        },
        cancelHandled() {
            this.set('editClassDlg', false);
            this.set('deleteClassDlg', false);
            this.set('addTechDlg', false);
            this.set('addStudDlg', false);
            this.set('addArrClassDlg', false);
            this.set('removeTechDlg', false);
            this.set('removeStudDlg', false);
            this.set('removeUnitDlg', false);
            this.set('noteError', false);
        },
        onEditClassClick() {
            this.set('classTitle', this.model.class.classTitle);
            this.set('editClassDlg', true);
        },
        editClassHandled() {
            if(this.classTitle == "" || this.classTitle == null ) {
                this.set('noteError', true);
                return;
            }
            let that = this;
            let onSuccess = function () {
                that.set('editClassDlg', false);
                that.toast.success('', '编辑班级成功', that.toastOptions);
            }
            let onFail = function () {
                that.toast.error('', '编辑班级失败', that.toastOptions);
            }
            this.model.class.set("title", this.classTitle)
            this.model.class.set("sessioninfo", this.store.peekRecord("sessioninfo", this.cur_course_id))
            this.model.class.save().then(onSuccess, onFail)
        },
        addTechHandled() {
            if(this.model.class.teachers != null) {
                for(let idx = 0;idx < this.model.class.teachers.length;idx++) {
                    if(this.addTechId == this.model.class.teachers.objectAt(idx).get("id")) {
                        this.toast.error('', '已存在当前教师', this.toastOptions);
                        return;
                    }
                }
            }
            let that = this;
            let onSuccess = function () {
                that.set('addTechDlg', false);
                that.set("addTechId", "");
                that.set("addJobDuty", "");
                that.toast.success('', '添加老师成功', that.toastOptions);
            }
            let onFail = function () {
                that.toast.error('', '添加老师失败', that.toastOptions);
            }
            let addTech = null
            for(let idx = 0;idx < this.model.techs.length;idx++) {
                if(this.addTechId == this.model.techs.objectAt(idx).id) {
                    // this.model.transTech(this.model.techs.objectAt(idx))
                    addTech = this.model.techs.objectAt(idx);
                }
            }
            // addTech.set()duty = this.addJobDuty;
            this.model.class.teachers.pushObject(addTech);
            this.model.class.save().then(onSuccess, onFail)
        },
        addStudHandled() {
            // console.log(this.selectedStuds)
            let that = this;
            let onSuccess = function () {
                that.set('addStudDlg', false);
                that.set("selectedStuds", null);
                that.toast.success('', '添加学生成功', that.toastOptions);
            }
            let onFail = function () {
                that.toast.error('', '添加学生失败', that.toastOptions);
            }
            if(this.selectedStuds != null) {
                this.model.class.students.pushObjects(this.selectedStuds);
                this.model.class.save().then(onSuccess, onFail)
            } else {
                this.toast.success('', '请选择学生', this.toastOptions);
            }
        },
        onTabClicked(params) {

        },
        onDeleteClassClick() {
            let that = this;
                let onSuccess = function() {
                    that.set('deleteClassDlg', false);
                    that.transitionToRoute('classes');
                    that.toast.success('', '删除班级成功', that.toastOptions);
                }
                let onFail = function() {
                    that.toast.error('', '删除班级失败', that.toastOptions);
                    this.model.class.rollbackAttributes();
                    return
                }
            this.model.class.deleteRecord()
            this.model.class.save().then(onSuccess, onFail)
        },
    },
});
