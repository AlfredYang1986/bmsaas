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

    cur_idx: 0,
    editRoomDlg: false,
    deleteRoomDlg: false,
    addTemp:null,
    editTemp:null,
    
    typeChecked: A(['自有', '租用', '公共']),
    type_idx: 0,
    type: computed('type_idx', function() {
        // if(this.type_idx == 0) {
        //     this.set('apply.kid.gender', 0)
        // } else if(this.type_idx == 1) {
        //     this.set('apply.kid.gender', 1)
        // } else {
        //     this.set('apply.kid.gender', 2)
        // }
    }),

    actions: {
        handlePageChange(pageNum) {
            this.set('bm_room_service.page', pageNum - 1);
            this.bm_room_service.queryMultiObjects();
        },
        onAddRoomClick() {
            // if(this.apply.kid.gender == 0) {
            //     this.set('sex_idx', 1)
            // } else if(this.apply.kid.gender == 1) {
            //     this.set('sex_idx', 0)
            // } else {
            //     this.set('sex_idx', 2)
            // }
            this.set('editRoomDlg', true);
        },
        onEditRoomClick() {
            this.set('editRoomDlg', true);
        },
        onDeleteRoomClick() {
            // this.set('tmpSessionable', params);
            this.set('deleteRoomDlg', true);
        },
        onDeleteRoomClickOk() {
            // let that = this;
            // let callback = {
                //     onSuccess: function() {
                    //         that.bm_sessionable_service.set('refresh_all_token', that.bm_sessionable_service.guid());
                    //         that.toast.success('', '删除场次成功', that.toastOptions);
                    //         that.set('deleteSessionDlg', false);
                    //         debug('delete　reservable　success')
                    //     },
                    //     onFail: function() {
            //         that.toast.error('', '删除场次失败', that.toastOptions);
            //         debug('delete　reservable　fail')
            //     }
            // }
            // this.bm_sessionable_service.deleteSessionable(callback,this.tmpSessionable);
            // this.set('tmpSessionable', "");
        },
        cancelHandled() {
            // this.set('tmpSessionable', "");
            // this.set('noteError', false);
            // this.set('noteTimeError', false);
            // this.set('showAddSessionDlg', false);
            // this.set('deleteRoomDlg', false);
            // this.set('closeRoomDlg', false);
            this.set('editRoomDlg', false);
            this.set('deleteRoomDlg', false);
        },
        successHandled() {
            this.set('editRoomDlg', false);
        },
    },


});
