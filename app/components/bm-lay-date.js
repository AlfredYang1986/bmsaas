import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    positionalParams: ['lang', 'pickType', 'range', 'inputVal'],
    lang: 'zh',
    pickType: 'date',
    range: false,
    inputVal: new Date().getTime(),

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
            value: new Date(this.inputVal)
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
