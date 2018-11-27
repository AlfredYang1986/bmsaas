import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
    positionalParams: ['tech', 'canChecked'],
    bmOss: service(),
    canChecked: false,
    checked: false,
    iconImg: computed('tech', function(){
        let client = this.bmOss.get('ossClient');

        let url = client.signatureUrl(this.tech.icon);
        console.log(url);
        return url;
    }),
    click() {
        if (this.canChecked) {
            if (this.checked) {
                this.set('checked', false);
            } else {
                this.set('checked', true);
            }

            this.onTechCardClicked(this.tech.id, this.checked);
        } else {
            this.onTechCardClicked(this.tech.id);
        }
    },
    classNameBindings: [
        'checked:selected_tech',
    ],
});
