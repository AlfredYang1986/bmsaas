import Component from '@ember/component';

export default Component.extend({
    positionalParams: ['session'],
    cur_page_idx: 0,
    actions: {
        saveCourseBtnClicked() {
            this.onSaveSessionBtnClicked();
        }
    }
});
