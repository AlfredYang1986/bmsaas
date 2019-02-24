import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import EmberObject from '@ember/object';
import { computed } from '@ember/object';

export default Controller.extend({

    toast: service(),
    toastOptions: EmberObject.create({
        closeButton: false,
        positionClass: 'toast-top-center',
        progressBar: false,
        timeOut: '2000',
    }),

    pagenum: 1,
    totalCount: 0,
    urls: null,

    cur_room_id: "",
    cur_rooms: null,

    cur_idx: 0,
    cur_yard_id: '',

    cur_tmp_date: Date(),
    cur_start_date: Date(),
    cur_end_date: Date(),

    edit_flag_info: "",
    edit_flag: false,
    noteError: false,
    noteTimeError: false,

    tmpSessionable: '',

    showAddSessionDlg: false,
    deleteActvDlg: false,
    closeActvDlg: false,
    deleteSessionDlg: false,

    classes: computed('pagenum', function() {
        let ps = this.store.query('class', { 'page[number]': this.pagenum, 'page[size]': 20, "reservable-id": this.model.actv.get("id")})
        ps.then(() => { this.set('total_count', localStorage.getItem('classes-count')) })
        return ps
    }),
    actions: {
        handlePageChange (target_page) {
            this.set('pagenum', target_page);
        },
        refreshDataComplete(res) {
            let paramsArr = res.split(' ');
            let count = paramsArr[0];
            let page = paramsArr[1];
            this.set('total_count', count)
            this.set('page_count', page)
        },
        linkToActvField(idx) {
            this.transitionToRoute('detail.actv-field', idx, this.model.actv.id);
        },
        onOpenActvClick() {
            this.model.actv.set("startDate", 0)
            this.model.actv.set("endDate", 0)

            let that = this;
            let onSuccess = function() {
                that.set('closeActvDlg', false);
                that.toast.success('', '开启成功', that.toastOptions);
            }
            let onFail = function() {
                that.toast.error('', '开启失败', that.toastOptions);
            }
            this.model.actv.save().then(onSuccess, onFail);
        },
        onShutdownActvClick() {
            this.model.actv.set("startDate", -1)
            this.model.actv.set("endDate", -1)

            let that = this;
            let onSuccess = function() {
                that.set('closeActvDlg', false);
                that.toast.success('', '关闭成功', that.toastOptions);
            }
            let onFail = function() {
                that.toast.error('', '关闭失败', that.toastOptions);
            }
            this.model.actv.save().then(onSuccess, onFail);
        },
        onDeleteActvClick() {
            let that = this;
            for(let idx = 0;idx < this.model.actv.classes.length;idx++) {
                that.model.actv.classes.objectAt(idx).deleteRecord()
                that.model.actv.classes.objectAt(idx).save()
            }
            let onSuccess = function() {
                that.toast.success('', '删除体验课成功', that.toastOptions);
                that.set('deleteActvDlg', false);
                that.transitionToRoute('actv');
            }
            let onFail = function() {
                that.toast.error('', '删除体验课失败', that.toastOptions);
            }
            this.model.actv.deleteRecord(this.model.actv)
            this.model.actv.save().then(onSuccess, onFail);
        },
        onEditSessionClick(params) {
            this.set('tmpSessionable', params);
            // this.set('cur_room_id', params.units.objectAt(0).room.get("id"));
            this.set('cur_tmp_date', this.getTimeDay(params.startDate));
            this.set('cur_start_date', params.startDate);
            this.set('cur_end_date', params.endDate);
            this.set('edit_flag_info', "编辑");
            this.set('edit_flag', true);
            this.set('showAddSessionDlg', true);

            let tmpClassId = this.tmpSessionable.id
            let that = this
            this.store.query('unit',  { 'class-id': tmpClassId }).then(res => {
                let ut = res.objectAt(0)
                that.set('cur_room_id', ut.room.get("id"));
                that.set('tmpUnit', ut)
            }).catch(() => {
                that.toast.error('', that.edit_flag_info + '场次失败', that.toastOptions);
            })
        },
        onDeleteSessionClick(params) {
            this.set('tmpSessionable', params);
            this.set('deleteSessionDlg', true);
        },
        onDeleteSessionClickOk() {
            let that = this;
            let onSuccess = function() {
                that.tmpSessionable.units.removeAt(0);
                that.tmpSessionable.deleteRecord();
                tmpUnit.deleteRecord();
                that.tmpSessionable.save().then(() => {
                    tmpUnit.save().then(() => {
                        that.toast.success('', '删除场次成功', that.toastOptions);
                        that.set('deleteSessionDlg', false);
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

            let tmpUnit = this.tmpSessionable.units.objectAt(0);
            this.model.actv.classes.removeObject(this.tmpSessionable)
            this.model.actv.save().then(onSuccess, onFail);
        },
        cancelHandled() {
            this.set('tmpSessionable', "");
            this.set('noteError', false);
            this.set('noteTimeError', false);
            this.set('showAddSessionDlg', false);
            this.set('deleteActvDlg', false);
            this.set('closeActvDlg', false);
            this.set('deleteSessionDlg', false);
            this.set('edit_flag', false);
            this.set('cur_tmp_date', new Date());
            this.set('cur_start_date', new Date());
            this.set('cur_end_date', new Date());
            this.set('cur_room_id', "");
        },
        successHandled() {
            if (this.checkValidate() & this.checkTime()) {

                let that = this;
                let edit_flag_info = "添加";
                if (this.get('edit_flag_info')) {
                    edit_flag_info = this.get('edit_flag_info');
                }

                if(this.edit_flag) {

                    let tmpUnit = this.get('tmpUnit')

                    // let tmpClassId = this.tmpSessionable.id
                    // this.store.queryRecord('unit',  { 'class-id': tmpClassId }).then(res => {
                    //     // save unit
                    //     this.tmpSessionable.set("startDate", this.handleDate(this.cur_tmp_date, this.cur_start_date))
                    //     this.tmpSessionable.set("endDate", new Date(this.cur_end_date).getTime())

                    //     let tmpUnit = res
                    //     tmpUnit.set("room", that.store.peekRecord("room", that.cur_room_id));
                    //     tmpUnit.set("startDate", this.tmpSessionable.startDate);
                    //     tmpUnit.set("endDate", this.tmpSessionable.endDate);

                    //     return tmpUnit.save()
                    // })

                    this.tmpSessionable.set("startDate", this.handleDate(this.cur_tmp_date, this.cur_start_date))
                    this.tmpSessionable.set("endDate", new Date(this.cur_end_date).getTime())

                    tmpUnit.set("room", that.store.peekRecord("room", that.cur_room_id));
                    tmpUnit.set("startDate", this.tmpSessionable.startDate);
                    tmpUnit.set("endDate", this.tmpSessionable.endDate);
                    tmpUnit.save()
                    .then(() => {
                        // save class
                        return this.tmpSessionable.save()

                    }).then(() => {
                        that.toast.success('', edit_flag_info + '场次成功', that.toastOptions);
                        that.set('cur_tmp_date', new Date());
                        that.set('cur_start_date', new Date());
                        that.set('cur_end_date', new Date());
                        that.set('edit_flag', false);
                        that.set('showAddSessionDlg', false);

                    }).catch(() => {
                        this.toast.error('', edit_flag_info + '场次失败', this.toastOptions);
                    })

                    // let onSuccess = function() {
                    //     that.toast.success('', edit_flag_info + '场次成功', that.toastOptions);
                    //     that.set('cur_tmp_date', new Date());
                    //     that.set('cur_start_date', new Date());
                    //     that.set('cur_end_date', new Date());
                    //     that.set('edit_flag', false);
                    //     that.set('showAddSessionDlg', false);
                    // }
                    // let onFail = function() {
                    //     that.toast.error('', edit_flag_info + '场次失败', that.toastOptions);
                    // }

                    // this.tmpSessionable.set("startDate", this.handleDate(this.cur_tmp_date, this.cur_start_date))
                    // this.tmpSessionable.set("endDate", new Date(this.cur_end_date).getTime())

                    // let tmpUnit = this.tmpSessionable.units.objectAt(0);
                    // tmpUnit.set("room", that.store.peekRecord("room", that.cur_room_id));
                    // tmpUnit.set("startDate", this.tmpSessionable.startDate);
                    // tmpUnit.set("endDate", this.tmpSessionable.endDate);
                    // tmpUnit.save().then(() => {
                    //     this.tmpSessionable.save().then(onSuccess, onFail)
                    // },() => {
                    //     this.toast.error('', edit_flag_info + '场次失败', this.toastOptions);
                    // })
                }else{
                    let tmpClass = this.store.createRecord("class");
                    tmpClass.set("startDate", this.handleDate(this.cur_tmp_date, this.cur_start_date));
                    tmpClass.set("endDate", new Date(this.cur_end_date).getTime());
                    tmpClass.set("status", 1);
                    tmpClass.set("yard",that.model.yard)
                    tmpClass.set("brandId", localStorage.getItem('brandid'))
                    tmpClass.set("reservableitem", this.model.actv)
                    tmpClass.save().then(() => {
                        let tmpUnit = this.store.createRecord("unit", {"status": 1})
                        tmpUnit.set("brandId", localStorage.getItem('brandid'))
                        tmpUnit.set("startDate", tmpClass.startDate);
                        tmpUnit.set("endDate", tmpClass.endDate);
                        tmpUnit.set("room", that.store.peekRecord("room", that.cur_room_id));
                        tmpUnit.set("class", tmpClass);
                        return tmpUnit.save()

                    }).then(() => {
                        let ps = this.store.query('class', { 'page[number]': this.pagenum, 'page[size]': 20, "reservable-id": this.model.actv.get("id")})
                        this.set('classes', ps)
                        ps.then(() => {
                            that.set('totalCount', localStorage.getItem('classes-count'))
                        })

                        that.set('showAddSessionDlg', false);
                        that.set('cur_tmp_date', new Date());
                        that.set('cur_start_date', new Date());
                        that.set('cur_end_date', new Date());

                        that.toast.success('', edit_flag_info + '场次成功', that.toastOptions);
                    }).catch(() => {
                        that.toast.error('', edit_flag_info + '场次失败', that.toastOptions);
                    })
                }
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
        }
    },

    checkValidate() {
        return this.cur_room_id != null && this.cur_room_id != "";
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
