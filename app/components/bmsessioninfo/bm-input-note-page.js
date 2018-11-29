import Component from '@ember/component';

export default Component.extend({
    positionalParams: ['session'],
    ifNoteInput: '',
    noInputChecked: '',
    init() {
        this._super(...arguments);
        if(this.isCreate) {
            this.set('ifNoteInput', '');
            this.set('noInputChecked', '');
        } else {
            if(this.session.notice == '') {
                this.set('ifNoteInput', 'disabled');
                this.set('noInputChecked', 'checked');
            }
        }
    },
    actions: {
        noNote() {
            if(this.ifNoteInput == '') {
                this.set('ifNoteInput', 'disabled');
                this.set('noInputChecked', 'checked');
                this.set('session.notice', '');
            } else {
                this.set('ifNoteInput', '');
                this.set('noInputChecked', '');
            }

        }
    }
});
