import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Controller.extend({
    bm_sessionable_service: service(),
    cur_idx: 0,
    titles: A(['全部', '未排课', 'On Going', 'Finished']),
    openFlag: true,
    addClassDlg: false,
    noteError: false,
    actions: {
        cardClicked(idx) {
            this.transitionToRoute('detail.classes', idx);
        },
        // createClass() {
        //     this.transitionToRoute('edit.classes')
        // }
        onAddClassClick() {
            this.set('addClassDlg', true);
        },
        cancelHandled() {
            this.set('addClassDlg', false);
        },
        successHandled() {
            console.log(1)
        }
    }
});
