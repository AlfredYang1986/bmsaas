import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { debug } from '@ember/debug';

export default Controller.extend({
    tableTitle: A(["孩子","生日","性别", "联系方式", "渠道"]),
    // bm_actv_service: service(),
    // bm_sessionable_service: service(),
    // bm_yard_service: service(),
    toast: service(),
    toastOptions: {
        closeButton: false,
        positionClass: 'toast-top-center',
        progressBar: false,
        timeOut: '2000',
    },

    urls: null,
    cur_room_id: "",
    cur_rooms: null,
    cur_yard_id: "",
    cur_tmp_date: Date(),
    cur_start_date: Date(),
    cur_end_date: Date(),
    noteError: false,
    // couldSubmit: computed('cur_yard_id', function() {
    //     return this.cur_yard_id != null && this.cur_yard_id != "";
    // }),

    deleteSessionDlg: false,
    showEditSessionDlg: false,

    actions: {
        handlePageChange (pageNum) {
            this.set('bm_sessionable_service.curAttendeesPage',this.bm_sessionable_service.localAttendeesPages[pageNum - 1]) 
        },
        onEditSessionable() {
            this.set('cur_room_id', this.model.class.units.objectAt(0).room.get("id"));
            this.set('cur_tmp_date', this.getTimeDay(this.model.class.startDate));
            this.set('cur_start_date', this.model.class.startDate);
            this.set('cur_end_date', this.model.class.endDate);
            this.set('showEditSessionDlg', true);
        },
        onDeleteSessionableClick() {
            // let that = this;
            // let onSuccess = function() {
            //     that.model.class.deleteRecord();
            //     that.model.class.save();
            //     that.toast.success('', '删除场次成功', that.toastOptions);
            //     that.set('deleteSessionDlg', false);
            //     that.transitionToRoute("detail.exp", that.model.reexpid)
            // }
            // let onFail = function() {
            //     that.toast.error('', '删除场次失败', that.toastOptions);
            // }
            // this.model.exp.classes.removeObject(this.model.class)
            // this.model.exp.save().then(onSuccess, onFail);

            let that = this;
            let onSuccess = function() {
                that.model.class.units.removeAt(0);
                that.model.class.deleteRecord();
                tmpUnit.deleteRecord();
                that.model.class.save().then(() => {
                    tmpUnit.save().then(() => {
                        that.toast.success('', '删除场次成功', that.toastOptions);
                        that.set('deleteSessionDlg', false);
                        that.transitionToRoute("detail.actv", that.model.reexpid)
                    },() => {
                        that.toast.error('', '删除场次失败', that.toastOptions);
                    })
                },() => {
                    that.toast.error('', '删除场次失败', that.toastOptions);
                });
            }
            let onFail = function() {
                that.toast.error('', '删除场次失败', that.toastOptions);
            }

            let tmpUnit = this.model.class.units.objectAt(0);
            this.model.actv.classes.removeObject(this.model.class)
            this.model.actv.save().then(onSuccess, onFail);
        },
        cancelHandled() {
            this.set('noteError', false);
            this.set('noteTimeError', false);
            this.set('deleteSessionDlg', false);
            this.set('showEditSessionDlg', false);
            this.set('cur_tmp_date', new Date());
            this.set('cur_start_date', new Date());
            this.set('cur_end_date', new Date());
            this.set('cur_room_id', "");
        },
        successHandled() {
            if (this.checkValidate() & this.checkTime()) {
                let that = this;
                let onSuccess = function() {
                    that.toast.success('', '编辑场次成功', that.toastOptions);
                    that.set('cur_tmp_date', new Date());
                    that.set('cur_start_date', new Date());
                    that.set('cur_end_date', new Date());
                    that.set('showEditSessionDlg', false);
                }
                let onFail = function() {
                    that.toast.error('', '编辑场次失败', that.toastOptions);
                }
                this.model.class.set("startDate", this.handleDate(this.cur_tmp_date, this.cur_start_date))
                this.model.class.set("endDate", new Date(this.cur_end_date).getTime())

                let tmpUnit = this.model.class.units.objectAt(0);
                tmpUnit.set("room", that.store.peekRecord("room", that.cur_room_id));
                tmpUnit.set("startDate", this.model.class.startDate);
                tmpUnit.set("endDate", this.model.class.endDate);
                tmpUnit.save().then(() => {
                    this.model.class.save().then(onSuccess, onFail)
                },() => {
                    this.toast.error('', '编辑场次失败', this.toastOptions);
                })
                // let onSuccess = function() {
                //     that.toast.success('', '修改场次成功', that.toastOptions);
                //     that.set('cur_tmp_date', new Date());
                //     that.set('cur_start_date', new Date());
                //     that.set('cur_end_date', new Date());
                //     that.set('showEditSessionDlg', false);
                // }
                // let onFail = function() {
                //     that.toast.error('', '修改场次失败', that.toastOptions);
                // }
                // this.model.class.set("startDate", this.handleDate(this.cur_tmp_date, this.cur_start_date))
                // this.model.class.set("endDate", new Date(this.cur_end_date).getTime())
                // this.model.class.save().then(onSuccess, onFail)
                // this.set('edit_flag', false);
            } else if (!this.checkValidate() & this.checkTime()) {
                this.set('noteError', true);
                this.set('noteTimeError', false);

            } else if (this.checkValidate() & !this.checkTime()) {
                this.set('noteError', false);
                this.set('noteTimeError', true);
            } else {
                this.set('noteError', true);
                this.set('noteTimeError', true);
            }
        },
        reservableChanged() {
            let sel = document.getElementById('reservableselect');
            if (sel.selectedIndex != 0) {
                this.set('cur_yard_id', sel.options[sel.selectedIndex].value);
            } else {
                this.set('cur_yard_id', "");
            }
        },
    },
    checkValidate() {
        // return this.cur_yard_id != null && this.cur_yard_id != "";
        // return true;
        return this.cur_room_id != null && this.cur_room_id != "";
    },
    checkTime() {
        let checkStart = new Date(this.cur_start_date);
        let checkEnd = new Date(this.cur_end_date);
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
