import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    positionalParams: ['lang', 'pickType', 'range'],
    lang: 'zh',
    pickType: 'date',
    range: false,
    inputVal: '',
    gid: computed(function(){
        return this.guid();
    }),
    init() {
        this._super(...arguments);
    },
    didInsertElement() {
        window.laydate.render({
            elem: window.document.getElementById(this.gid), //指定元素
            type: this.pickType,
            range: this.range,
            lang: this.lang,
        });
    },
    guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
});
