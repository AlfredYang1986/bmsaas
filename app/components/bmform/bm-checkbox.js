import Component from '@ember/component';
import { A } from '@ember/array';

export default Component.extend({
    positionalParams: ['title', 'checkboxItem', 'checkboxTitle'],
    checkboxTitle: '',
    handledArr: A([]),

    actions: {
        onClick (value) {
            if (this.handledArr.indexOf(value) == -1) {
                this.handledArr.push(value)
            } else {
                this.handledArr.splice(this.handledArr.indexOf(value), 1)
            }
            // console.log(this.handledArr)
        }
    },
});
