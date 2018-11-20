import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
    positionalParams: ['yard', 'canChecked'],
    bmOss: service(),
    canChecked: false,
    checked: false,
    iconImg: computed('yard', function(){
        let client = this.bmOss.get('ossClient');

        if (this.yard.cover) {
            return client.signatureUrl(this.yard.cover);
        } else {
            return '';
        }
    }),
    click() {
        if (this.canChecked) {
            if (this.checked) {
                this.checked = false;
            } else {
                this.checked = true;
            }

            this.onYardCardClicked(this.yard.id, checked);
        } else {
            this.onYardCardClicked(this.yard.id);
        }
    },
    classNameBindings: [
        'checked:selected_tech',
    ],
});
