import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default Controller.extend({
    selectedYard: '',
    openFlag: true,

    bm_clsarr_service: service(),
    toast: service(),
    toastOptions: {
        closeButton: false,
        positionClass: 'toast-top-center',
        progressBar: false,
        timeOut: '2000',
    },

    cur_room_id: "",
    cur_class_id: "",
    cur_tech_id: "",
    cur_course_time: "",
    cur_tmp_date: new Date().getTime(),
    cur_start_date: new Date().getTime(),
    cur_end_date: new Date().getTime(),
    tempUnit: null,
    tempTechs: null,

    addUnitDlg: false,
    removeUnitDlg: false,

    courseTimeArr:A([{name: 0.5}, {name: 1}, {name: 1.5}, {name: 2}, {name: 2.5}, {name: 3}, {name: 3.5}, {name: 4}, {name: 4.5}, {name: 5}]),


    refreshSelected: computed(function(){
        var sel = document.getElementById("yardselect");
        this.set('selectedYard', sel.options[sel.selectedIndex].value);
        return '';
    }),
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
            this.set('tempTechs', null);
            this.set("tempUnit", null)
            this.set('addUnitDlg', false);
            this.set('removeUnitDlg', false);
        },
        successHandled() {
            this.set('addUnitDlg', false);

            // let tempclass = this.store.peekRecord("class", this.cur_class_id);

            // this.tempUnit = this.store.createRecord("unit");
            // this.tempUnit.set("courseTime", this.cur_course_time)
            // this.tempUnit.set("startDate", this.handleDate(this.cur_tmp_date,this.cur_start_date))
            // this.tempUnit.set("endDate", this.cur_end_date)
            // this.tempUnit.set("room", this.store.peekRecord("room", this.cur_room_id))
            // this.tempUnit.set("class", tempclass) //设置不了class关联 双绑问题
            // this.tempUnit.set("teacher", this.store.peekRecord("teacher", this.cur_tech_id))
            // this.tempUnit.save().then(result => {
            //     window.console.info(tempclass.toJSON())
            //     // tempclass.save().then(result => {
            //     //     window.console.info(result)
            //     // })
            // })

            // tempclass.save().then(result => {
            //     window.console.info(result)
            // })

            this.tempUnit = this.store.createRecord("unit");
            this.tempUnit.save().then(() => {
                let tempclass = this.store.peekRecord("class", this.cur_class_id)
                this.tempUnit.set("courseTime", this.cur_course_time)
                this.tempUnit.set("startDate", this.handleDate(this.cur_tmp_date,this.cur_start_date))
                this.tempUnit.set("endDate", this.cur_end_date)
                this.tempUnit.set("room", this.store.peekRecord("room", this.cur_room_id))
                this.tempUnit.set("class", tempclass) //设置不了class关联 双绑问题
                this.tempUnit.set("teacher", this.store.peekRecord("teacher", this.cur_tech_id))
                this.tempUnit.save().then(res => {
                    // tempclass.units.pushObject(res)
                    tempclass.save().then(() => {
                        this.bm_clsarr_service.set('refresh_all_token', this.bm_clsarr_service.guid());
                        this.set("tempUnit", null)
                        this.toast.success('', '添加排课成功', this.toastOptions);
                    },() => {
                        this.toast.error('', '添加排课失败', this.toastOptions);
                    })
                },(err) => {
                    this.toast.error('', '添加排课失败', this.toastOptions);
                })
            },(err) => {
                this.toast.error('', '添加排课失败', this.toastOptions);
            })
        },
        afterClassChange() {
            let tempClass = this.store.peekRecord("class", this.cur_class_id);
            this.set("tempTechs", tempClass.teachers);
            // 有BUG 选择的班级没有老师时触发
        },
        onPanelClick(param) {
            console.log(param)
        },
        onEditClick(param) {
            console.log(param)
        },
        onDeleteClick(param) {
            this.set("tempUnit", param)
            this.set('removeUnitDlg', true);
        },
        onDeleteUnitClickOk() {
            let tempClass = this.store.peekRecord("class", this.tempUnit.class.get("id")) 
            window.console.log(tempClass);
            tempClass.get("units").removeObject(this.tempUnit)
            tempClass.save().then(() => {
                this.tempUnit.deleteRecord()
                this.tempUnit.save().then(() => {
                    this.set("tempUnit", null)
                    this.set('removeUnitDlg', false);
                    this.toast.success('', '删除排课成功', this.toastOptions);
                },() => {
                    this.toast.error('', '删除排课失败', this.toastOptions);
                })
            },() => {
                this.toast.error('', '删除排课失败', this.toastOptions);
            })
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
        return checkStart <= checkEnd;
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
