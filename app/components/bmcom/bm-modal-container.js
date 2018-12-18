import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    positionalParams: ['title', 'mswitch', 'canceltext', 'successtext', 'cancelbtncss', 'successbtncss', 'needSubmit', 'contentSubmit','backdropClose'],
    needTitle: computed(function(){
        return this.title != null && this.title.length > 0;
    }),
    mswitch: false,
    canceltext: '',
    successtext: '确定',
    // needSubmit:observer('needSubmit', function() {
    //     return needSubmit;
    // }),
    needcancel: computed('canceltext', function(){
        return this.canceltext != null && this.canceltext.length > 0;
    }),
    cancelbtncss: '',
    successbtncss: '',
    actions: {
        successBtnClicked() {
            this.onSuccessBtnClicked();
        },
        cancelBtnClicked() {
            this.onCancelBtnClicked();
        }
    }
});
