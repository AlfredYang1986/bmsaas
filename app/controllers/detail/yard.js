import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import { debug } from '@ember/debug';

export default Controller.extend({
    init() {
        this._super(...arguments);
    },
    bm_yard_service: service(),
    bm_room_service: service(),
    toast: service(),
    toastOptions: {
        closeButton: false,
        positionClass: 'toast-top-center',
        progressBar: false,
        timeOut: '2000',
    },
    edit_flag_info: "",

    cur_idx: 0,
    editRoomDlg: false,
    deleteRoomDlg: false,
    tempRoom:null,
    
    typeChecked: A(['自有', '租用', '公共']),
    type_idx: 0,
    type: computed('type_idx', function() {
        // if(this.type_idx == 0) {
        //     this.set('bm_room_service.room.roomType', 0)
        // } else if(this.type_idx == 1) {
        //     this.set('bm_room_service.room.roomType', 1)
        // } else {
        //     this.set('bm_room_service.room.roomType', 2)
        // }
    }),

    actions: {
        handlePageChange(pageNum) {
            this.set('bm_room_service.page', pageNum - 1);
            this.bm_room_service.queryMultiObjects();
        },
        onAddRoomClick() {
            this.set('edit_flag_info', "添加");
            this.bm_room_service.genNewRoom();
            this.set('type_idx', 0)
            this.set('editRoomDlg', true);
        },
        onEditRoomClick(params) {
            // this.set('tempRoom', params);
            this.bm_room_service.genNewRoom();
            this.set('bm_room_service.room.id',params.id);
            this.set('bm_room_service.room.roomType',params.roomType);
            this.set('bm_room_service.room.capacity',params.capacity);
            this.set('bm_room_service.room.title',params.title);
            this.set('bm_room_service.room.yardId',params.yardId);
            this.set('type_idx',params.roomType);
            this.set('edit_flag_info', "编辑");
            this.set('editRoomDlg', true);
        },
        onDeleteRoomClick(params) {
            this.set('tempRoom', params);
            this.set('deleteRoomDlg', true);
        },
        onDeleteRoomClickOk() {
            this.set('bm_room_service.roomid', this.tempRoom.id);
            let that = this;
            let callback = {
                onSuccess: function () {
                    that.toast.success('', '删除教室成功', that.toastOptions);
                    that.bm_room_service.set('refresh_all_token', that.bm_room_service.guid());
                    that.set('deleteRoomDlg', false);
                    debug('delete　reservable　success')
                },
                onFail: function () {
                    that.toast.error('', '删除教室失败', that.toastOptions);
                    debug('delete　reservable　fail')
                }
            }
            this.bm_room_service.deleteRoom(callback);
            this.set('tempRoom', null);
        },
        cancelHandled() {
            // this.set('tmpSessionable', "");
            // this.set('noteError', false);
            // this.set('noteTimeError', false);
            // this.set('showAddSessionDlg', false);
            // this.set('deleteRoomDlg', false);
            // this.set('closeRoomDlg', false);
            this.set('type_idx', 0)
            this.set('editRoomDlg', false);
            this.set('deleteRoomDlg', false);
        },
        successHandled() {

            this.set('bm_room_service.room.roomType', this.type_idx);

            let that = this
            let callback = {
                onSuccess: function () {
                    that.set('editRoomDlg', false);
                    that.toast.success('', that.edit_flag_info + '教室成功', that.toastOptions);
                    that.bm_room_service.set('refresh_all_token', that.bm_room_service.guid());
                    debug('push room success')
                },
                onFail: function () {
                    that.toast.error('', that.edit_flag_info + '教室失败', that.toastOptions);
                    debug('push room fail')
                }
            }
            this.bm_room_service.saveUpdate(callback);
            
        },
    },

});
