import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import EmberObject from '@ember/object';
import { A } from '@ember/array';

export default Component.extend({

    init() {
        this._super(...arguments);
        if(this.apply.courseType == 1) {
            this.set('courseReserve', true);
            this.set('experienceApply', false);
        } else if(this.apply.courseType == 0) {
            this.set('courseReserve', false);
            this.set('experienceApply', true);
        }

    },
    
	bm_error_service: service(),
    store: service(),
    toast: service(),
    toastOptions: EmberObject.create({
        closeButton: false,
        positionClass: 'toast-top-center',
        progressBar: false,
        timeOut: '2000',
    }),

    sr: computed('srClasses', function() {
        return this.srClasses;
    }),
    sa: computed('saClasses', function() {
        return this.saClasses;
    }),
    positionalParams: ['formErrorFlag', 'saClasses','srClasses','exp', 'actv', 'apply', 'selectedReservable', 'selectedYard', 'selectedDate', 'selectedActivity', 'selectedSession', 'innerCat', 'courseType', 'noteError', 'noSr', 'noSy', 'noSa', 'noSs'],

    expSession: null,
    actvSession: null,
    expField: null,
    actvField: null,
    tempItem: null,
    courseReserve: true,
    experienceApply: false,
    noteError: false,
    sel: null,
    errorImg: "https://bm-web.oss-cn-beijing.aliyuncs.com/icon_status_error%402x.png",
    course_lst: computed(function(){
        return this.mock_data.courseCandi();
    }),

    exp_session_lst: computed('selectedReservable', function(){
        // let reservableitemid = this.selectedReservable;
        return '';
    }),

    act_session_lst: computed("selectedActivity", function(){
        this.bm_sessionable_service.set('reservableid', this.selectedActivity);
        this.bm_sessionable_service.set('refresh_all_token', this.bm_sessionable_service.guid());
        return '';
    }),

    actions: {
        toggleAction() {
            if(this.courseReserve) {
                this.set('experienceApply', true);
                this.set('courseReserve', false);
                this.set('formErrorFlag', false);
                this.set('noSr', false);
                this.set('noSa', false);
                this.set('noSy', false);
                this.set('noSs', false);
            } else {
                this.set('courseReserve', true);
                this.set('experienceApply', false);
                this.set('formErrorFlag', false);
                this.set('noSr', false);
                this.set('noSa', false);
                this.set('noSy', false);
                this.set('noSs', false);
            }
            // this.sendAction('toggleAction');
            this.toggleAction();

        },
        reservableChanged() {
            // let that = this;
            // let sel = document.getElementById("reservableselect");
            // this.set('sel', sel)
            // if (sel.selectedIndex == 0) {
            //     this.set('selectedReservable', null);
            // } else {
            //     this.set('selectedReservable', sel.options[sel.selectedIndex].value);
            // }

            let tempItem = this.store.peekRecord("reservableitem", this.selectedReservable);
            this.store.query('class', { "reservable-id": tempItem.id}).then((res) => {
                if(res.length == 0) {
                    this.set('expField', null);
                    this.toast.error('', '此参与内容暂无场次，请先添加场次！', this.toastOptions);
                } else {
                    let tempArr = A([])
                    res.forEach(elem => {
                        let startDate = new Date(elem.startDate);
                        let endDate = new Date(elem.endDate);
                        let yardTitle = "";
                        let titleString = "";
                        let tempObj = {};
                        tempObj.id = elem.id;
                        titleString = startDate.getFullYear() + '-' + (startDate.getMonth() + 1 < 10 ? '0' + (startDate.getMonth() + 1) : startDate.getMonth() + 1) + '-' + (startDate.getDate() < 10 ? '0' + startDate.getDate() : startDate.getDate());
                        titleString += " ";
                        titleString += (startDate.getHours() < 10 ? '0' + startDate.getHours() : startDate.getHours()) + ':' + (startDate.getMinutes() < 10 ? '0' + startDate.getMinutes() : startDate.getMinutes());
                        titleString += "~";
                        titleString += (endDate.getHours() < 10 ? '0' + endDate.getHours() : endDate.getHours()) + ':' + (endDate.getMinutes() < 10 ? '0' + endDate.getMinutes() : endDate.getMinutes());
                        titleString += " ";
                        elem.get('yard').then(result => {
                            yardTitle = result.title;
                            titleString += yardTitle;
                            tempObj.title = titleString;
                            tempArr.pushObject(tempObj)
                        }, error => {
                            this.bm_error_service.handleError(error)
                        });
                        
                    });
                    this.set('expField', tempArr);
                }
            }, error => {
                this.bm_error_service.handleError(error)
            })

        },
        // yardChanged() {
        //     var sel = document.getElementById("yardselect");
        //     if (sel.selectedIndex == 0) {
        //         this.set('selectedYard', null);
        //     } else {
        //         this.set('selectedYard', sel.options[sel.selectedIndex].value);
        //     }
        // },
        activityChanged() {
            // let that = this;
            // var sel = document.getElementById('actselect');
            // if (sel.selectedIndex == 0) {
            //     this.set('selectedActivity', null);
            // } else {
            //     this.set('selectedActivity', sel.options[sel.selectedIndex].value);
            // }

            let tempItem = this.store.peekRecord("reservableitem", this.selectedActivity);
            this.store.query('class', { "reservable-id": tempItem.id}).then((res) => {
                if(res.length == 0) {
                    this.set('actvField', null);
                    this.toast.error('', '此参与内容暂无场次，请先添加场次！', this.toastOptions);
                } else {
                    let tempArr = A([])
                    res.forEach(elem => {
                        let startDate = new Date(elem.startDate);
                        let endDate = new Date(elem.endDate);
                        let yardTitle = "";
                        let titleString = "";
                        let tempObj = {};
                        tempObj.id = elem.id;
                        titleString = startDate.getFullYear() + '-' + (startDate.getMonth() + 1 < 10 ? '0' + (startDate.getMonth() + 1) : startDate.getMonth() + 1) + '-' + (startDate.getDate() < 10 ? '0' + startDate.getDate() : startDate.getDate());
                        titleString += " ";
                        titleString += (startDate.getHours() < 10 ? '0' + startDate.getHours() : startDate.getHours()) + ':' + (startDate.getMinutes() < 10 ? '0' + startDate.getMinutes() : startDate.getMinutes());
                        titleString += "~";
                        titleString += (endDate.getHours() < 10 ? '0' + endDate.getHours() : endDate.getHours()) + ':' + (endDate.getMinutes() < 10 ? '0' + endDate.getMinutes() : endDate.getMinutes());
                        titleString += " ";
                        elem.get('yard').then(result => {
                            yardTitle = result.title;
                            titleString += yardTitle;
                            tempObj.title = titleString;
                            tempArr.pushObject(tempObj)
                        }, error => {
                            this.bm_error_service.handleError(error)
                        });
                        
                    });
                    this.set('actvField', tempArr);
                }
            }, error => {
                this.bm_error_service.handleError(error)
            })
        },
        // sessionChanged() {
        //     var sel = document.getElementById('sessionselect');
        //     if (sel.selectedIndex == 0) {
        //         this.set('selectedSession', null);
        //     } else {
        //         this.set('selectedSession', sel.options[sel.selectedIndex].value);
        //     }
        // }
    },

    display_apply_date: computed(function(/*ele*/){
        let date = new Date(this.apply.applyTime);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes());
        // var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
        return Y+M+D+h+m;
    }),

    didReceiveAttrs() {
        let tempArr = A([])
        this.exp.forEach(elem => {
            let tempObj = {};
            tempObj.id = elem.id;
            elem.get('sessioninfo').then(res => {
                tempObj.title = res.title;
            }, error => {
                this.bm_error_service.handleError(error)
            });
            tempArr.pushObject(tempObj)
        });
        this.set('expSession', tempArr);

        tempArr = A([]);
        this.actv.forEach(elem => {
            let tempObj = {};
            tempObj.id = elem.id;
            elem.get('sessioninfo').then(res => {
                tempObj.title = res.title;
            }, error => {
                this.bm_error_service.handleError(error)
            });
            tempArr.pushObject(tempObj)
        });
        this.set('actvSession', tempArr);
    }
});
