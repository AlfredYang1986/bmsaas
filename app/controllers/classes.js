import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Controller.extend({
    bm_class_service: service(),
    // cur_idx: 0,
    titles: A(['全部', '未排课', 'On Going', 'Finished']),
    openFlag: true,
    addClassDlg: false,
    addSuccessDlg: false,
    noteError: false,
    actions: {
        onTabClicked(tabIdx) {
            this.set('bm_class_service.page', 0)
            if (tabIdx == 0) {
                this.bm_class_service.queryMultiObjects("all");
            } else if(tabIdx == 1) {
                this.bm_class_service.queryMultiObjects("pre");
            } else if(tabIdx == 2) {
                this.bm_class_service.queryMultiObjects("going");
            } else if(tabIdx == 3) {
                this.bm_class_service.queryMultiObjects("finish");
            }
            console.log(1)
        },
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
            this.set('addSuccessDlg', false);
        },
        successHandled() {
            console.log(1)
            this.set('addClassDlg', false);
            console.log('dsgfsdg')
            this.set('addSuccessDlg', true);
        },
        onAddSuccess() {
            console.log(2)
            this.set('addSuccessDlg', false);
        },
    }
});
