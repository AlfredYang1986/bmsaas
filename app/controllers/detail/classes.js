import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { debug } from '@ember/debug';
// import { computed } from '@ember/object';
import { A } from '@ember/array';

export default Controller.extend({

    bm_class_service: service(),
    bm_session_service: service(),
    bm_sessionable_service: service(),
    bm_tech_service: service(),
    bm_stud_service: service(),
    bm_courseunit_service: service(),
    toast: service(),
    toastOptions: {
        closeButton: false,
        positionClass: 'toast-top-center',
        progressBar: false,
        timeOut: '2000',
    },

    addTechId: "",
    addJobDuty: "",
    jobDuty: A([{name:'主讲'}, {name:'助教'}]),
    classTitle: "",
    tmpTech: null,
    tmpStud: null,
    tmpUnit: null,

    cur_idx: 0,

    editClassDlg: false,
    deleteClassDlg: false,
    addTechDlg: false,
    addStudDlg: false,
    addArrClassDlg: false,
    removeTechDlg: false,
    removeStudDlg: false,
    removeUnitDlg: false,

    noteError: false,

    // classTitle: computed('bm_class_service.class', function() {
    //     console.log(this.bm_class_service.class)
    //     return;
    // }),

    actions: {
        
        onRemoveArrcourseClick(param) {
            this.set('tmpUnit', param);
            this.set('removeUnitDlg', true);
        },
        onRemoveArrcourseClickOk() {
            let that = this;
            let callback = {
                onSuccess: function() {
                    debug('delete success')
                    that.set('removeUnitDlg', false);
                    this.bm_courseunit_service.set('refresh_all_token', this.bm_session_service.guid());
                    that.toast.success('', '删除课程安排成功', that.toastOptions);
                },
                onFail: function() {
                    that.toast.error('', '删除课程安排失败', that.toastOptions);
                    debug('delete fail')
                }
            }
            this.bm_courseunit_service.delete(callback,this.tmpUnit.id);
        },
        onRemoveStudClick(param) {
            this.set('tmpStud', param);
            this.set('removeStudDlg', true);
        },
        onRemoveStudClickOk() {
            for(let idx = 0;idx < this.bm_class_service.class.Attendees.length;idx++) {
                if(this.bm_class_service.class.Attendees[idx].id == this.tmpTech.id) {
                    this.bm_class_service.class.Attendees.removeObject(this.bm_class_service.class.Attendees[idx])
                }
            }
            this.bm_class_service.resetInfoAndYard(this.bm_class_service.class.Yard.id, this.bm_class_service.class.SessionInfo.id);
            // this.bm_class_service.resetTechs(this.bm_class_service.class.Teachers);
            this.bm_class_service.resetAttendee(this.bm_class_service.class.Attendees);
            let that = this
            let callback = {
                onSuccess: function() {
                    that.set('removeStudDlg', false);
                    that.toast.success('', '移除学生成功', that.toastOptions);
                    that.bm_class_service.set('refresh_token', that.bm_class_service.guid());
                    debug('push sessionable success')
                },
                onFail: function() {
                    that.toast.error('', '移除学生失败', that.toastOptions);
                    debug('push sessionable fail')
                }
            }
            this.bm_class_service.saveUpdate(callback);
        },
        onRemoveTeacherClick(param) {
            this.set('tmpTech', param);
            this.set('removeTechDlg', true);
        },
        onRemoveTeacherClickOk() {
            for(let idx = 0;idx < this.bm_class_service.class.Teachers.length;idx++) {
                if(this.bm_class_service.class.Teachers[idx].id == this.tmpTech.id) {
                    this.bm_class_service.class.Teachers.removeObject(this.bm_class_service.class.Teachers[idx])
                }
            }
            this.bm_class_service.resetInfoAndYard(this.bm_class_service.class.Yard.id, this.bm_class_service.class.SessionInfo.id);
            // this.bm_class_service.resetTechs(this.bm_class_service.class.Teachers);
            this.bm_class_service.resetAttendee(this.bm_class_service.class.Attendees);
            let that = this
            let callback = {
                onSuccess: function() {
                    that.set('removeTechDlg', false);
                    that.toast.success('', '移除老师成功', that.toastOptions);
                    that.bm_class_service.set('refresh_token', that.bm_class_service.guid());
                    debug('push sessionable success')
                },
                onFail: function() {
                    that.toast.error('', '移除老师失败', that.toastOptions);
                    debug('push sessionable fail')
                }
            }
            this.bm_class_service.saveUpdate(callback);
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
            this.set('classTitle', this.bm_class_service.class.classTitle);
            this.set('editClassDlg', true);
        },
        editClassHandled() {
            if(this.classTitle == "" || this.classTitle == null ) {
                this.set('noteError', true);
                return;
            }
            this.set('bm_class_service.class.classTitle', this.classTitle);
            this.bm_class_service.resetInfoAndYard(this.bm_class_service.class.Yard.id, this.bm_class_service.class.SessionInfo.id);
            // this.bm_class_service.resetTechs(this.bm_class_service.class.Teachers);
            this.bm_class_service.resetAttendee(this.bm_class_service.class.Attendees);
            let that = this
            let callback = {
                onSuccess: function() {
                    that.set('editClassDlg', false);
                    that.toast.success('', '编辑班级成功', that.toastOptions);
                    that.bm_class_service.set('refresh_token', that.bm_class_service.guid());
                    debug('push sessionable success')
                },
                onFail: function() {
                    that.toast.error('', '编辑班级失败', that.toastOptions);
                    debug('push sessionable fail')
                }
            }
            this.bm_class_service.saveUpdate(callback);
        },
        addTechHandled() {
            if(this.bm_class_service.class.Teachers != null) {
                for(let idx = 0;idx < this.bm_class_service.class.Teachers.length;idx++) {
                    if(this.addTechId == this.bm_class_service.class.Teachers[idx].id) {
                        this.toast.error('', '已存在当前教师', this.toastOptions);
                        return;
                    }
                }
            } else {
                this.set("bm_class_service.class.Teachers", []);
            }

            let addTech = null
            for(let idx = 0;idx < this.bm_tech_service.techs.length;idx++) {
                if(this.addTechId == this.bm_tech_service.techs[idx].id) {
                    this.bm_class_service.transTech(this.bm_tech_service.techs[idx])
                    addTech = this.bm_tech_service.techs[idx];
                }
            }
            addTech.duty = this.addJobDuty;
            this.bm_class_service.class.Teachers.pushObject(addTech);

            this.bm_class_service.resetInfoAndYard(this.bm_class_service.class.Yard.id, this.bm_class_service.class.SessionInfo.id);
            // this.bm_class_service.resetTechs(this.bm_class_service.class.Teachers);
            this.bm_class_service.resetAttendee(this.bm_class_service.class.Attendees);
            let that = this
            let callback = {
                onSuccess: function() {
                    that.set('addTechDlg', false);
                    that.set("addTechId", "");
                    that.set("addJobDuty", "");
                    that.toast.success('', '添加老师成功', that.toastOptions);
                    that.bm_class_service.set('refresh_token', that.bm_class_service.guid());
                    debug('push success')
                },
                onFail: function() {
                    that.toast.error('', '添加老师失败', that.toastOptions);
                    debug('push fail')
                }
            }
            this.bm_class_service.saveUpdate(callback);
        },
        addStudHandled() {

        },
        onTabClicked(params) {
            if(params == 2) {
                this.bm_courseunit_service.set('refresh_all_token', this.bm_session_service.guid());
            }
        },
        onDeleteClassClick() {
            let that = this;
            let callback = {
                onSuccess: function() {
                    debug('delete success')
                    that.set('deleteClassDlg', false);
                    that.transitionToRoute('classes');
                    that.toast.success('', '删除班级成功', that.toastOptions);
                },
                onFail: function() {
                    that.toast.error('', '删除班级失败', that.toastOptions);
                    debug('delete fail')
                }
            }
            this.bm_class_service.delete(callback);
        },
    },
});
