import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({

    init() {
        this._super(...arguments);
        this.addObserver('showAddSessionDlg', this, 'generateSessionable');
    },

    bm_actv_service: service(),
    bm_sessionable_service: service(),
    bm_yard_service: service(),

    cur_idx: 0,
    cur_yard_id: '',

    actions: {
        linkToActvField(idx) {
            this.transitionToRoute('detail.actv-field', idx, this.bm_actv_service.actv.id);
            // this.transitionToRoute('detail.exp-field', idx, this.bm_exp_service.exp.id);
        },
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
            
            this.bm_sessionable_service.resetInfoAndYard(this.cur_yard_id, this.bm_actv_service.actv.SessionInfo.id);
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
        if (this.showAddSessionDlg == true) {
            this.bm_sessionable_service.set('sessionableid', 'sessionable/push');
            this.bm_sessionable_service.querySessionable();
        }
    }
});
