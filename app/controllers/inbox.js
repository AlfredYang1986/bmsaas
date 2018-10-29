import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
    mock_data: service(),
    today_apply_count: computed(function(){
        return this.mock_data.todayApplies().length;
    }),
    older_apply_count: computed(function(){
        return this.mock_data.olderApplies().length;
    }),
    showhandledlg: false,
    current_apply: null,
    showcomfirmdlg: false,

    sr : null, 
    sy: null, 
    isV: false,

    actions: {
        saveInfo() {
            this.set('modal3',false);
            let that = this;
            setTimeout(function() {
                that.set('saveInfo',true)
            },500);
        },
        setCurrentApply(item) {
            this.set('sr', null);
            this.set('sy', null);
            this.set('isV', false);
            this.set('current_apply', item);
            this.set('showhandledlg', true);
        },
        successSave() {
            this.set('saveInfo',false);
        },
        successHandled() {
            debugger

            this.set('showhandledlg', false);
        },
        cancelHandled() {
            this.set('sr', null);
            this.set('sy', null);
            this.set('isV', false);
            this.set('current_apply', null);
            this.set('showhandledlg', false);
        }
    },
});
