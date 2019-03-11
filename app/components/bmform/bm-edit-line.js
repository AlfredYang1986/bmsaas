import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    positionalParams: ['title', 'pholder', "readonly", 'maxCount', 'notNeeded', 'inputVal','height', 'group', 'largeInput', 'numberInput', 'largeNumberInput', 'maxlength', 'needTitleDes', 'titleDes', 'fullWidthInput', 'needBottomHint', 'needFocusOut', "haveHeader"],
    haveHeader: true,
    count: computed('inputVal', function() {
        if (typeof this.inputVal == 'string')
            return this.inputVal.length;
        else return 0;
    }),
    countHint: computed('count', 'maxCount', function() {
        if (typeof this.maxCount == 'undefined') return '';
        else return `字数 (${this.count}/${this.maxCount})`;
    }),
    actions: {
        onKeyPress() {
            let regex = new RegExp(/[\d]/);
            if(regex.test(String.fromCharCode(event.keyCode))) {
                return;
            } else {
                if ( event && event.preventDefault ){
                    //非IE浏览器
                    event.preventDefault();
                } else {
                    //IE浏览器
                    window.event.returnValue = false;
                }
            }
            // if(regex.test(value)) {

            // };
        },
        // onKeyUp() {
        //     this.sendAction("onKeyUp");
        //     // this.onKeyUp();
        // },
        onFocusOut() {
            // this.sendAction("onFocusOut");
            this.onFocusOut();
        }
    }
});
