import Component from '@ember/component';

export default Component.extend({
    positionalParams: ['dataLeft' ,'dataRight'],
    tagName: '',
    agesLeft: Array.from(new Array(20), (val,index) => (index).toString()),
    agesRight: Array.from(new Array(20),(val,index)=> (index).toString()),

    selectedLeft: 'dataLeft',
    selectedRight: 'dataRight',

    actions: {
        changeAgeLeft(value) {
            let now = value;
            this.set('dataLeft', now)
        },
        changeAgeRight(value) {
            let now = value;
            this.set('dataRight', now)
        },
    }
});
