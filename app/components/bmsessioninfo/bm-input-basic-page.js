import Component from '@ember/component';
import { A } from '@ember/array';

export default Component.extend({
    positionalParams: ['session'],
    ageInput: true,
    ageInputChecked: 'checked',
    ageNoInput: '',
    levelInput: true,
    levelInputRadio: 'checked',
    levelNoRadio: '',
    inputChecked: '',
    inputNoChecked: '',
    lengthIf: true,
    sel_time: A([{name: 15}, {name: 30}, {name: 45}, {name: 60}, {name: 75}, {name: 90}, {name: 105}, {name: 120}, {name: 135}, {name: 150}, {name: 165}, {name: 180}, ]),
    init() {
        this._super(...arguments);
        if(this.isCreate) {
            this.set('levelInputRadio', 'checked');
            this.set('levelNoRadio', '');
        } else {
            if(this.session.level == '') {
                this.set('levelInputRadio', '');
                this.set('levelNoRadio', 'checked');
                this.set('levelInput', false);
            }
        }

        if(this.session.alb == -1 & this.session.aub ==-1) {
            this.set('ageInputChecked', '');
            this.set('ageNoInput', 'checked');
            this.set('ageInput', false);
        }

        if(this.session.length == -1) {
            this.set('lengthIf', false);
            this.set('inputChecked', '');
            this.set('inputNoChecked', 'checked');
        }
    },
    actions: {
        ageSelect() {
            if(this.ageInput == true) {
                this.set('ageInput', false);
            } else {
                this.set('ageInput', true);
            }
        },
        lengthNoSelected() {
            if(this.lengthIf == true) {
                this.set('lengthIf', false);
                this.set('session.length', -1)
            } else {
                this.set('lengthIf', true);
                this.set('session.length', 0)
            }
        },
        onKeyPress() {
            let regex = new RegExp(/^\d*[1-9]{1,}\d*$/);
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
    }
});
