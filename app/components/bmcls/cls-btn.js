import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    positionalParams: ['isPrev', 'isNext', 'isNormal', 'args'],
    tagName: 'button',
    isPrev: false,
    isNext: false,
    isNormal: false,
    isEnter: false,
    isClick: false,
    isClickEnter: computed('isEnter', 'isClick', function(){
        return this.isEnter && this.isClick;
    }),
    classNameBindings: ['isNormal:cls-normal', 
                        'isClickEnter:cls-click-enter',
                        'isPrev:prev-btn', 
                        'isNext:next-btn'],
    click() {
        this.onBtnClicked();
    },
    mouseEnter() {
        this.set('isEnter', true);
    },
    mouseLeave() {
        this.set('isEnter', false);
    },
    mouseDown() {
        this.set('isClick', true);
    },
    mouseUp() {
        this.set('isClick', false);
    }
});
