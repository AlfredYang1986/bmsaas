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
    tmpDuty: null,
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
                    that.set('removeUnitDlg', false);
                    that.set('tmpUnit', null);
                    that.toast.success('', '移除课程安排成功', that.toastOptions);
                })

            }
            let onFail = function () {
                that.toast.error('', '移除课程安排失败', that.toastOptions);
            }
            this.model.class.units.removeObject(this.tmpUnit)
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
            this.set('tmpDuty', param);
            this.set('removeTechDlg', true);
        },
        onRemoveTeacherClickOk() {
            let that = this;
            let onSuccess = function () {
                that.tmpDuty.deleteRecord();
                that.tmpDuty.save().then(() => {
                    that.set('removeTechDlg', false);
                    that.set('tmpDuty', null);
                    that.toast.success('', '移除老师成功', that.toastOptions);
                },() => {
                })
            }
            let onFail = function () {
                that.toast.error('', '移除老师失败', that.toastOptions);
            }
            this.model.class.duties.removeObject(this.tmpDuty)
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
            let addTech = null
            let addDuty = this.store.createRecord("duty")
            if(this.model.class.duties != null) {
                for(let idx = 0;idx < this.model.class.duties.length;idx++) {
                    if(this.addTechId == this.model.class.duties.objectAt(idx).teacher.get("id")) {
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

            for(let idx = 0;idx < this.model.techs.length;idx++) {
                if(this.addTechId == this.model.techs.objectAt(idx).id) {
                    // this.model.transTech(this.model.techs.objectAt(idx))
                    addTech = this.model.techs.objectAt(idx);
                }
            }
            addDuty.save().then(() => {
                addDuty.set("teacherDuty", this.addJobDuty)
                addDuty.set("teacher", addTech)
                addDuty.save().then(() => {
                    this.model.class.duties.pushObject(addDuty);
                    this.model.class.save().then(onSuccess, onFail)
                },() => {
                    that.toast.error('', '添加老师失败', that.toastOptions);
                })
            },() => {
                that.toast.error('', '添加老师失败', that.toastOptions);
            })
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
        onAddArrClassClick() {
            this.transitionToRoute("arrange-class")
        },
        onArrcourseClick() {

        },
        onEditArrcourseClick() {

        },
        onTabClicked(params) {

        },
        onDeleteClassClick() {
            let that = this;
            let onSuccess = function() {
                tmpUnits.forEach((elem, index, arr) => {
                    elem.deleteRecord();
                    elem.save().then(() => {
                        countIdx++;
                        if(countIdx == arr.length) {
                            that.set('deleteClassDlg', false);
                            that.transitionToRoute('classes');
                            that.toast.success('', '删除班级成功', that.toastOptions);
                        }
                    },() => {
                        that.toast.error('', '删除班级失败', that.toastOptions);
                    });
                });
            }
            let onFail = function() {
                that.toast.error('', '删除班级失败', that.toastOptions);
                // this.model.class.rollbackAttributes();
                return
            }
            let countIdx = 0;
            let tmpUnits = A([])
            this.model.class.units.forEach((elem) => {
                tmpUnits.pushObject(elem)
            })
            this.model.class.deleteRecord();
            this.model.class.save().then(onSuccess, onFail);
        },
    },
});
