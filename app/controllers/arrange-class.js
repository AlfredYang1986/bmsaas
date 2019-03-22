import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
// import { computed } from '@ember/object';
import EmberObject from '@ember/object';
import { A } from '@ember/array';


export default Controller.extend({
    selectedYard: '',
    openFlag: true,

    bm_clsarr_service: service(),
    bm_error_service: service(),
    toast: service(),
    toastOptions: EmberObject.create({
        closeButton: false,
        positionClass: 'toast-top-center',
        progressBar: false,
        timeOut: '2000',
    }),

    cur_room_id: "",
    cur_class_id: "",
    cur_tech_id: "",
    cur_course_time: "",
    cur_tmp_date: new Date().getTime(),
    cur_start_date: new Date().getTime(),
    cur_end_date: new Date().getTime(),
    tempUnit: null,
    tempDuties: null,
    tempTechs: A([]),

    addUnitDlg: false,
    removeUnitDlg: false,

    roomErrorFlag: false,
    classErrorFlag: false,
    timeErrorFlag: false,
    periodErrorFlag: false,
    techErrorFlag: false,
    formErrorFlag: false,

    courseTimeArr:A([{name: 0.5}, {name: 1}, {name: 1.5}, {name: 2}, {name: 2.5}, {name: 3}, {name: 3.5}, {name: 4}, {name: 4.5}, {name: 5}]),


    // refreshSelected: computed(function(){
    //     var sel = document.getElementById("yardselect");
    //     this.set('selectedYard', sel.options[sel.selectedIndex].value);
    //     return '';
    // }),
    actions: {
        yardChanged() {
            var sel = document.getElementById("yardselect");
            this.set('selectedYard', sel.options[sel.selectedIndex].value);
        },
        onAddUnitClick() {
            this.set('addUnitDlg', true);
        },
        cancelHandled() {
            this.set('cur_room_id', "");
            this.set('cur_class_id', "");
            this.set('cur_tech_id', "");
            this.set('cur_course_time', "");
            this.set('cur_tmp_date',  new Date().getTime());
            this.set('cur_start_date',  new Date().getTime());
            this.set('cur_end_date',  new Date().getTime());
            this.set('tempDuties', null);
            this.set("tempTechs", null);
            this.set("tempUnit", null)
            this.set('addUnitDlg', false);
            this.set('removeUnitDlg', false);

            this.set("roomErrorFlag", false);
            this.set("classErrorFlag", false);
            this.set("periodErrorFlag", false);
            this.set("techErrorFlag", false);
            this.set("timeErrorFlag", false);
            this.set("formErrorFlag", false);
        },
        successHandled() {
            if(this.cur_room_id == null || this.cur_room_id == "") {
                this.set("roomErrorFlag", true);
            } else {
                this.set("roomErrorFlag", false);
            }
            if(this.cur_class_id == null || this.cur_class_id == "") {
                this.set("classErrorFlag", true);
            } else {
                this.set("classErrorFlag", false);
            }
            if(this.cur_course_time == null || this.cur_course_time == "") {
                this.set("periodErrorFlag", true);
            } else {
                this.set("periodErrorFlag", false);
            }
            if(this.cur_tech_id == null || this.cur_tech_id == "") {
                this.set("techErrorFlag", true);
            } else {
                this.set("techErrorFlag", false);
            }
            if(!this.checkTime()) {
                this.set("timeErrorFlag", true);
            } else {
                this.set("timeErrorFlag", false);
            }
            if(this.roomErrorFlag || this.classErrorFlag || this.techErrorFlag || this.periodErrorFlag || this.timeErrorFlag) {
                this.set("formErrorFlag", true);
            } else {
                this.set("formErrorFlag", false);
            }

            if(this.formErrorFlag) {
                return;
            } else {
                let edit_flag_info = "编辑";
                if(this.tempUnit == null) {
                    this.tempUnit = this.store.createRecord("unit");
                    edit_flag_info  = "添加";
                }

                this.tempUnit.save().then(() => {
                    let tempclass = this.store.peekRecord("class", this.cur_class_id)
                    this.tempUnit.set("courseTime", this.cur_course_time)
                    this.tempUnit.set("startDate", this.handleDate(this.cur_tmp_date,this.cur_start_date))
                    this.tempUnit.set("endDate", this.cur_end_date)
                    this.tempUnit.set("room", this.store.peekRecord("room", this.cur_room_id))
                    this.tempUnit.set("class", tempclass)
                    this.tempUnit.set("teacher", this.store.peekRecord("teacher", this.cur_tech_id))
                    this.tempUnit.save().then(() => {
                        // tempclass.units.pushObject(res)
                        tempclass.save().then(() => {
                            this.bm_clsarr_service.set('refresh_all_token', this.bm_clsarr_service.guid());
                            this.set("tempUnit", null)
                            this.set('addUnitDlg', false);
                            this.toast.success('', edit_flag_info + '排课成功', this.toastOptions);
                        }, error => {
                            this.bm_error_service.handleError(error, edit_flag_info + '排课失败')
                            // this.toast.error('', edit_flag_info + '排课失败', this.toastOptions);
                        })
                    }, error => {
                        this.bm_error_service.handleError(error, edit_flag_info + '排课失败')
                        // this.toast.error('', edit_flag_info + '排课失败', this.toastOptions);
                    })
                }, error => {
                    this.bm_error_service.handleError(error, edit_flag_info + '排课失败')
                    // this.toast.error('', edit_flag_info + '排课失败', this.toastOptions);
                })

            }
        },
        afterClassChange() {
            // window.console.log(this.cur_class_id);
            let that = this;
            let tempClass = this.store.peekRecord("class", this.cur_class_id)
            tempClass.duties.then(() => {
                let tmpArr = A([]);
                for (let idx = 0; idx < tempClass.duties.length; idx++) {
                    // tmpArr.pushObject(tempClass.duties.objectAt(idx).teacher)
                    let tempId = tempClass.duties.objectAt(idx).get("teacher").get("id")
                    let tempObj = this.store.peekRecord("teacher", tempId)
                    tmpArr.pushObject(tempObj)
                }

                that.set("tempTechs", tmpArr);
                that.set("cur_tech_id", "");

                if(tmpArr.length == 0) {
                    that.toast.error('', '请先在班级中添加教师！', that.toastOptions);
                }
            })


        },
        onPanelClick() {
            // console.log(param)
        },
        onEditClick(param) {
            this.set("tempUnit", param)
            this.set('addUnitDlg', true);
            this.set("cur_course_time", this.tempUnit.courseTime)
            this.set("cur_tmp_date", this.getTimeDay(this.tempUnit.startDate))
            this.set("cur_start_date", this.tempUnit.startDate)
            this.set("cur_end_date", this.tempUnit.endDate)
            this.set("cur_room_id", this.tempUnit.room.get("id"))
            this.set("cur_class_id", this.tempUnit.class.get("id"))
            this.set("cur_tech_id", this.tempUnit.teacher.get("id"))
            let that = this;
            let tempClass = this.store.peekRecord("class", this.cur_class_id);
            tempClass.duties.then(() => {
                let tmpArr = A([]);
                for (let idx = 0; idx < tempClass.duties.length; idx++) {
                    // tmpArr.pushObject(tempClass.duties.objectAt(idx).teacher)
                    let tempId = tempClass.duties.objectAt(idx).get("teacher").get("id")
                    let tempObj = this.store.peekRecord("teacher", tempId)
                    tmpArr.pushObject(tempObj)
                }
                that.set("tempTechs", tmpArr);
                // that.set("cur_tech_id", "");

                if(tmpArr.length == 0) {
                    that.toast.error('', '请先在班级中添加教师！', that.toastOptions);
                }
            })
            // this.set("tempDuties", tempClass.duties);

        },
        onDeleteClick(param) {
            this.set("tempUnit", param)
            this.set('removeUnitDlg', true);
        },
        onDeleteUnitClickOk() {
            // if(this.tempUnit.status == 0) {


                // let tempClass = this.store.peekRecord("class", this.tempUnit.class.get("id"))
                // tempClass.get("units").removeObject(this.tempUnit)
                // tempClass.save().then(() => {
            this.tempUnit.deleteRecord()
            this.tempUnit.save().then(() => {
                this.set("tempUnit", null)
                this.set('removeUnitDlg', false);
                this.bm_clsarr_service.set('refresh_all_token', this.bm_clsarr_service.guid());
                this.toast.success('', '删除排课成功', this.toastOptions);
            }, error => {
                this.bm_error_service.handleError(error, '删除排课失败')
                // this.toast.error('', '删除排课失败', this.toastOptions);
            })
                // },() => {
                //     this.toast.error('', '删除排课失败', this.toastOptions);
                // })


            // } else {
            //     let tempClass = this.store.peekRecord("class", this.tempUnit.class.get("id"))
            //     tempClass.get("units").removeObject(this.tempUnit)
            //     tempClass.deleteRecord();
            //     tempClass.save().then(() => {
            //         this.tempUnit.deleteRecord()
            //         this.tempUnit.save().then(() => {
            //             this.set("tempUnit", null)
            //             this.set('removeUnitDlg', false);
            //             this.toast.success('', '删除排课成功', this.toastOptions);
            //         },() => {
            //             this.toast.error('', '删除排课失败', this.toastOptions);
            //         })
            //     },() => {
            //         this.toast.error('', '删除排课失败', this.toastOptions);
            //     })
            // }
        },

    },
    checkTime() {
        let checkStart = null;
        let checkEnd = null;

        checkStart = new Date(this.cur_start_date);
        checkEnd = new Date(this.cur_end_date);

        checkStart.setFullYear(2000);
        checkStart.setMonth(1);
        checkStart.setDate(1);
        checkStart.setSeconds(0);
        checkStart.setMilliseconds(0);
        checkEnd.setFullYear(2000);
        checkEnd.setMonth(1);
        checkEnd.setDate(1);
        checkEnd.setSeconds(0);
        checkEnd.setMilliseconds(0);
        return checkStart < checkEnd;
    },
    handleDate(date,time) {
        let tmpDate = new Date(date)
        let tmpTime = new Date(time)
        let result = new Date(tmpDate.getFullYear(), tmpDate.getMonth(), tmpDate.getDate(), tmpTime.getHours(), tmpTime.getMinutes(), tmpTime.getSeconds())
        return result.getTime();
    },
    getTimeDay(time) {
        let tmpDate = new Date(time);
        tmpDate.setHours(0);
        tmpDate.setMinutes(0);
        tmpDate.setSeconds(0);
        return tmpDate.getTime();
    }
});
