import Component from '@ember/component';

export default Component.extend({
    positionalParams: ['session'],
    ifNoteInput: '',
    noInputChecked: '',
    noteInput: true,
    init() {
        this._super(...arguments);
        if(this.isCreate) {
            this.set('ifNoteInput', '');
            this.set('noInputChecked', '');
        } else {
            if(this.session.notice == '') {
                this.set('ifNoteInput', 'disabled');
                this.set('noteInput', false)
            }
        }
    },
    actions: {
        noNote() {
            if(this.ifNoteInput == '') {
                this.set('ifNoteInput', 'disabled');
                this.set('noInputChecked', 'checked');
                this.set('session.notice', '');
                this.set('noteInput', false);
            } else {
                this.set('ifNoteInput', '');
                this.set('noInputChecked', '');
                this.set('noteInput', true);
            }

        }
    }
});
