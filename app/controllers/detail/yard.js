import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Controller.extend({
    toast: service(),
    toastOptions: {
        closeButton: false,
        positionClass: 'toast-top-center',
        progressBar: false,
        timeOut: '2000',
    },
    edit_flag_info: "",
    edit_flag: false,

    cur_idx: 0,
    editRoomDlg: false,
    deleteRoomDlg: false,
    noteError: false,
    tempRoom:null,
    
    typeChecked: A(['自有', '租用', '公共']),
    type_idx: 0,
    tempRoomTitle: "",
    // type: computed('type_idx', function() {
        // if(this.type_idx == 0) {
        //     this.set('bm_room_service.room.roomType', 0)
        // } else if(this.type_idx == 1) {
        //     this.set('bm_room_service.room.roomType', 1)
        // } else {
        //     this.set('bm_room_service.room.roomType', 2)
        // }
    // }),
    // detailAddress: computed('bm_yard_service.yard', function() {
    //     return this.bm_yard_service.yard.province + this.bm_yard_service.yard.city + this.bm_yard_service.yard.district + this.bm_yard_service.yard.district
    // }),

    curTabIdx: 0,

    actions: {
        handlePageChange(pageNum) {
            // this.set('bm_room_service.page', pageNum - 1);
            // this.bm_room_service.queryMultiObjects();
        },
        onAddYardClick() {
            this.transitionToRoute('edit.yard',"yard/push")
        },
        onAddRoomClick() {
            this.set('edit_flag', false);
            this.set('edit_flag_info', "添加");
            // this.bm_room_service.genNewRoom();
            this.set("tempRoom", this.store.createRecord('room'))
            this.set('tempRoomTitle', "")
            this.set('type_idx', 0)
            this.set('editRoomDlg', true);
        },
        onEditRoomClick(params) {
            this.set('tempRoom', params);
            // this.bm_room_service.genNewRoom();
            // this.set('bm_room_service.room.id',params.id);
            // this.set('bm_room_service.room.roomType',params.roomType);
            // this.set('bm_room_service.room.capacity',params.capacity);
            // this.set('bm_room_service.room.title',params.title);
            // this.set('bm_room_service.room.yardId',params.yardId);
            this.set('tempRoomTitle', params.title)
            this.set('type_idx',params.roomType);
            this.set('edit_flag', true);
            this.set('edit_flag_info', "编辑");
            this.set('editRoomDlg', true);
        },
        onDeleteRoomClick(params) {
            this.set('tempRoom', params);
            this.set('deleteRoomDlg', true);
        },
        onDeleteRoomClickOk() {
            let that = this;
            let onSuccess = function () {
                that.tempRoom.deleteRecord()
                that.tempRoom.save().then(onSuccess1, onFail1);
            }
            let onFail = function () {
                that.toast.error('', "删除教室失败", that.toastOptions);
            }
            let onSuccess1 = function () {
                that.toast.success('', "删除教室成功", that.toastOptions);
                that.set('deleteRoomDlg', false);
            }
            let onFail1 = function () {
                that.toast.error('', "删除教室失败", that.toastOptions);
            }
            this.model.yard.rooms.removeObject(this.tempRoom)
            this.model.yard.save().then(onSuccess, onFail);
            // this.set('bm_room_service.roomid', this.tempRoom.id);
            // let that = this;
            // let callback = {
            //     onSuccess: function () {
            //         that.toast.success('', '删除教室成功', that.toastOptions);
            //         that.bm_room_service.set('refresh_all_token', that.bm_room_service.guid());
            //         that.set('deleteRoomDlg', false);
            //         debug('delete　reservable　success')
            //     },
            //     onFail: function () {
            //         that.toast.error('', '删除教室失败', that.toastOptions);
            //         debug('delete　reservable　fail')
            //     }
            // }
            // this.bm_room_service.deleteRoom(callback);
            // this.set('tempRoom', null);
        },
        cancelHandled() {
            // this.set('tmpSessionable', "");
            // this.set('noteError', false);
            // this.set('noteTimeError', false);
            // this.set('showAddSessionDlg', false);
            // this.set('deleteRoomDlg', false);
            // this.set('closeRoomDlg', false);
            // this.set("model.yard", this.store.findRecord('yard', this.model.yardid))
            this.set('noteError', false);
            this.set('type_idx', 0)
            this.set('tempRoomTitle', "")
            this.set('editRoomDlg', false);
            this.set('deleteRoomDlg', false);
        },
        successHandled() {
            if(this.checkValidate()) {
                let that = this
                if(this.edit_flag) {
                    let onSuccess = function () {
                        that.toast.success('', that.edit_flag_info + '教室成功', that.toastOptions);
                        that.set('editRoomDlg', false);
                    }
                    let onFail = function () {
                        that.toast.error('', that.edit_flag_info + '教室失败', that.toastOptions);
                    }
                    this.set('tempRoom.title', this.tempRoomTitle);
                    this.set('tempRoom.roomType', this.type_idx);
                    this.tempRoom.save().then(onSuccess, onFail);
                } else {
                    let onSuccess = function () {
                        that.model.yard.rooms.pushObject(that.tempRoom)
                        that.model.yard.save().then(onSuccess1, onFail1);
                    }
                    let onFail = function () {
                        that.toast.error('', that.edit_flag_info + '教室失败', that.toastOptions);
                    }
                    let onSuccess1 = function () {
                        that.toast.success('', that.edit_flag_info + '教室成功', that.toastOptions);
                        that.set('editRoomDlg', false);
                    }
                    let onFail1 = function () {
                        that.toast.error('', that.edit_flag_info + '教室失败', that.toastOptions);
                    }
                    this.set('tempRoom.title', this.tempRoomTitle);
                    this.set('tempRoom.roomType', this.type_idx);
                    this.tempRoom.save().then(onSuccess, onFail);
                }


                // let that = this
                // let callback = {
                //     onSuccess: function () {
                //         that.set('editRoomDlg', false);
                //         that.toast.success('', that.edit_flag_info + '教室成功', that.toastOptions);
                //         that.bm_room_service.set('refresh_all_token', that.bm_room_service.guid());
                //         debug('push room success')
                //     },
                //     onFail: function () {
                //         that.toast.error('', that.edit_flag_info + '教室失败', that.toastOptions);
                //         debug('push room fail')
                //     }
                // }
                // this.bm_room_service.saveUpdate(callback);
            } else {
                this.set('noteError', true);
                return
            }
            
        },
    },
    checkValidate() {
        return this.tempRoom.title != "";
    },
});
