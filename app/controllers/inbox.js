import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import EmberObject from '@ember/object';

export default Controller.extend({
    cur_tab_idx: 0,
    cur_reserve_type: 0,
    pageNum: 1,
    pageNumSec: 1,
    
    bm_error_service: service(),
    toast: service(),
    tabs: A(['预约', '预注册']),
    toastOptions: EmberObject.create({
        closeButton: false,
        positionClass: 'toast-top-center',
        progressBar: false,
        timeOut: '2000',
    }),

    showhandledlg: false,
    showRegister: false,
    current_apply: null,
    current_edit_apply: null,
    showcomfirmdlg: false,
    isToday: false,

    sr : null,
    sy: null,
    sa: null,
    ss: null,
    noSr: false,
    noSy: false,
    noSa: false,
    noSs: false,
    formErrorFlag: false,

    dt: '2018-10-01',

    isCourse: true,
    noteError: false,

    srClasses: null,
    saClasses: null,
    contentSubmit: computed('sr', 'sa', function() {
        let that = this;
        if(this.sr != null) {
            let onSrSuccess = function(res) {
                that.store.query('class', { "reservable-id": res.id}).then((resu) =>{
                    that.set('srClasses', resu);
                }, error => {
                    that.bm_error_service.handleError(error)
                })

            }
            let onSrFail = function(error) {
                that.bm_error_service.handleError(error)
            }
            that.store.find('reservableitem', that.sr).then(onSrSuccess, onSrFail)
        }
        if(this.sa != null) {
            let onSaSuccess = function(res) {
                that.store.query('class', { "reservable-id": res.get("id")}).then((resu) =>{
                    that.set('saClasses', resu);
                }, error => {
                    that.bm_error_service.handleError(error)
                })
            }
            let onSaFail = function(error) {
                that.bm_error_service.handleError(error)
            }
            that.store.find('reservableitem', that.sa).then(onSaSuccess, onSaFail)
        }
    }),
    couldSubmit: computed('sy', 'ss', function() {
        return this.sr != null && this.sy != null || this.sa != null && this.ss != null;
    }),
    actions: {
        /* 今天全部预约与注册*/
        // handleBookPageChange (pagenum) {
        //     this.set('pageNum', pagenum)
        // },
        onTabClicked() {},
        saveInfo() {
            this.set('modal3',false);
            let that = this;
            setTimeout(function() {
                that.set('saveInfo',true)
            },500);
        },
        setCurrentApply(item) {
            let that = this;
            this.set('current_apply', item);
            if(item.courseType == -1) {
                let apply = this.current_apply;
                let stud = this.store.createRecord('student');
                let kid = this.current_apply.kids.firstObject;
                let applicant = this.current_apply.applicant;
                let guar = this.store.createRecord('guardian');
                stud.set('name', kid.name);
                stud.set('nickname', kid.nickname)
                stud.set('gender', kid.gender)
                stud.set('dob', kid.dob);
                stud.set('guardianRole', kid.guardianRole);
                stud.set('contact', apply.contact)
                stud.set('brandId', localStorage.getItem('brandid') )

                stud.guardians.pushObject(guar)
                stud.guardians.objectAt(0).set('name', applicant.content.name);
                stud.guardians.objectAt(0).set('gender', applicant.content.gender);
                stud.guardians.objectAt(0).set('contact', apply.contact);
                stud.guardians.objectAt(0).set('regDate', new Date().getTime());
                stud.guardians.objectAt(0).set('relationShip', kid.guardianRole);
                let onSuccess = function() {
                    that.transitionToRoute('edit.stud', stud.id + ' ' + apply.id);
                }
                let onFail = function(error) {
                    that.bm_error_service.handleError(error)
                }
                stud.save().then(onSuccess, onFail)
            } else {
                this.set('sr', null);
                this.set('sy', null);
                this.set('sa', null);
                this.set('ss', null);
                this.set('showhandledlg', true);
                this.set('formErrorFlag', false)
            }
        },

        successRegisterHandled() {},
        onPreRegisterClick() {},
        toggleAction() {
            let that = this;
            if(this.current_apply.courseType == 1) {
                that.set('current_apply.courseType', 0)
            } else if (this.current_apply.courseType == 0) {
                that.set('current_apply.courseType', 1)
            }
        },
        successSave() {},
        reserveTypeChanged() {
            let sel = document.getElementById('selectReserve');
            this.set("cur_reserve_type", sel.options[sel.selectedIndex].value);
        },
        preRegisterChanged() {},
        successHandled() {
            if (this.current_apply.courseType == 1) {
                    this.signCoureReserve();
                } else if(this.current_apply.courseType == 0){
                    this.signActivityReserve();
                }
        },
        cancelHandled() {
            this.set('showhandledlg', false);
            this.set('formErrorFlag', false);
            this.set('noSa', false);
            this.set('noSs', false);
            this.set('noSr', false);
            this.set('noSy', false);
        },
        cancelRegisterHandled() {},
        refreshDataComplete(appliesCount) {
            let paramsArr = appliesCount.split(' ');
            let applies_Count = paramsArr[0];
            let page_Count = paramsArr[1];
            this.set('applies_count', Number(applies_Count))
            this.set('page_count', Number(page_Count))
        },
        refreshDataCompleteSec(appliesCount) {
            let paramsArr = appliesCount.split(' ');
            let applies_Count = paramsArr[0];
            let page_Count = paramsArr[1];
            this.set('applies_count_sec', Number(applies_Count))
            this.set('page_count_sec', Number(page_Count))
        }
    },
    checkValidate() {},
    signCoureReserve() {
        if(this.sy == null || this.sy == '') {
            this.set('noSy', true)
        } else {
            this.set('noSy', false)
        }

        if(this.sr == null || this.sr == '') {
            this.set('noSr', true)
        } else {
            this.set('noSr', false)
        }

        if(this.noSy || this.noSr) {
            this.set('formErrorFlag', true)
        } else {
            this.set('formErrorFlag', false)
        }
        if(this.formErrorFlag) {
            return true
        } else {
            let that = this;
            let apply = this.current_apply;
            let kid = this.current_apply.kids.firstObject;
            let applicant = this.current_apply.applicant;
            let stud = this.store.createRecord('student');
            let guar = this.store.createRecord('guardian');
            stud.set('name', kid.name);
            stud.set('nickname', kid.nickname)
            stud.set('gender', kid.gender)
            stud.set('dob', kid.dob);
            stud.set('guardianRole', kid.guardianRole);
            stud.set('contact', apply.contact)
            stud.set('brandId', localStorage.getItem('brandid') )

            stud.guardians.pushObject(guar)
            stud.guardians.objectAt(0).set('name', applicant.content.name);
            stud.guardians.objectAt(0).set('gender', applicant.content.gender);
            stud.guardians.objectAt(0).set('contact', apply.contact);
            stud.guardians.objectAt(0).set('regDate', new Date().getTime());
            stud.guardians.objectAt(0).set('relationShip', kid.guardianRole);


            let onApplySuccess = function() {
                apply.set('status', 1);
                apply.save().then(() => {

                }, error => {
                    that.bm_error_service.handleError(error)
                });
                that.set('showhandledlg', false);
            }
            let onApplyFail = function(error) {
                that.bm_error_service.handleError(error)
            }

            let onClassSuccess = function(res) {
                res.students.pushObject(stud);
                res.save().then(onApplySuccess, onApplyFail)

            }
            let onClassFail = function(error) {
                that.bm_error_service.handleError(error)
            }

            let onStudSuccess = function() {
                that.store.find('class', that.sy).then(onClassSuccess, onClassFail)
            }
            let onStudFail = function(error) {
                that.bm_error_service.handleError(error)
            }

            stud.save().then(onStudSuccess, onStudFail);
        }


    },
    signActivityReserve() {
        if(this.sa == null || this.sa == '') {
            this.set('noSa', true)
        } else {
            this.set('noSa', false)
        }

        if(this.ss == null || this.sa == '') {
            this.set('noSs', true)
        } else {
            this.set('noSs', false)
        }

        if(this.noSa || this.noSs) {
            this.set('formErrorFlag', true)
        } else {
            this.set('formErrorFlag', false)
        }
        if(this.formErrorFlag) {
            return true
        } else {
            let that = this;
            let apply = this.current_apply;
            let kid = this.current_apply.kids.firstObject;
            let applicant = this.current_apply.applicant;
            let stud = this.store.createRecord('student');
            let guar = this.store.createRecord('guardian');
            stud.set('name', kid.name);
            stud.set('nickname', kid.nickname)
            stud.set('gender', kid.gender)
            stud.set('dob', kid.dob);
            stud.set('guardianRole', kid.guardianRole);
            stud.set('contact', apply.contact)
            stud.set('brandId', localStorage.getItem('brandid') )

            stud.guardians.pushObject(guar)
            stud.guardians.objectAt(0).set('name', applicant.content.name);
            stud.guardians.objectAt(0).set('gender', applicant.content.gender);
            stud.guardians.objectAt(0).set('contact', apply.contact);
            stud.guardians.objectAt(0).set('regDate', new Date().getTime());
            stud.guardians.objectAt(0).set('relationShip', kid.guardianRole);

            let onApplySuccess = function() {
                apply.set('status', 1);
                apply.save().then(() => {

                }, error => {
                    this.bm_error_service.handleError(error)
                });
                that.set('showhandledlg', false);
            }
            let onApplyFail = function(error) {
                that.bm_error_service.handleError(error)
            }

            let onClassSuccess = function(res) {
                res.students.pushObject(stud);
                res.save().then(onApplySuccess, onApplyFail)
            }
            let onClassFail = function(error) {
                that.bm_error_service.handleError(error)
            }

            let onStudSuccess = function() {
                // let actv = that.store.find('reservableitem', that.sa).then();
                that.store.find('class', that.ss).then(onClassSuccess, onClassFail)
            }
            let onStudFail = function(error) {
                that.bm_error_service.handleError(error)
            }

            stud.save().then(onStudSuccess, onStudFail);
        }
    },
});
