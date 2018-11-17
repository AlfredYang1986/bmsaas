import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({

    init() {
        this._super(...arguments);
        this.addObserver('showAddSessionDlg', this, 'generateSessionable');
    },

    bm_exp_service: service(),
    bm_sessionable_service: service(),
    bm_yard_service: service(),

    cur_idx: 0,
    // actions: {
    //     linkToExpField(idx) {
    //         this.transitionToRoute('detail.exp-field', idx);
    //     },
    // },
    cur_yard_id: '',
    
    actions: {
        cancelHandled() {
            this.set('showAddSessionDlg', false);
        },
        successHandled() {
            this.set('showAddSessionDlg', false);
            console.log('success');
            if (this.cur_yard_id.length == 0) {
                alert('shold add yard')
                return 
            }
            let callback = {
                onSuccess: function() {
                    console.log('push sessionable success')
                },
                onFail: function() {
                    console.log('push sessionable fail')
                }
            }
            
            this.bm_sessionable_service.resetInfoAndYard(this.cur_yard_id, this.bm_exp_service.exp.SessionInfo.id);
            this.bm_sessionable_service.resetTechs([]);
            this.bm_sessionable_service.resetAttendee([]);
            this.bm_sessionable_service.saveUpdate(callback);
        },
        reservableChanged() {
            let sel = document.getElementById('reservableselect');
            if (sel.selectedIndex != 0) {
                this.set('cur_yard_id', sel.options[sel.selectedIndex].value);
            }
        }
    },
    showAddSessionDlg: false,
    
    generateSessionable() {
        this.bm_sessionable_service.set('sessionableid', 'sessionable/push');
        this.bm_sessionable_service.querySessionable();
    }
});
