import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
    positionalParams: ['tech', 'canChecked'],
    bmOss: service(),
    headImg: 'https://bm-web.oss-cn-beijing.aliyuncs.com/avatar_defautl_96px%20%401x.png',
    canChecked: false,
    checked: false,
    iconImg: computed('tech', function(){
        let client = this.bmOss.get('ossClient');
        if(this.tech.icon == undefined || this.tech.icon == '') {
            return this.headImg;
        } else {
            return client.signatureUrl(this.tech.icon);
        }
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
