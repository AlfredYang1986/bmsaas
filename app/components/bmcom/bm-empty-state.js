import Component from '@ember/component';

export default Component.extend({
    positionalParams: ['picData', 'picUrl', 'title', 'des', 'btnText',  'act'],
    classNames: ['bm-empty-state'],
    picUrl: '',
    des: '',
    btnText: '',

    actions: {
        actOnClick() {
            console.log('dadada')
        },
    }
});
