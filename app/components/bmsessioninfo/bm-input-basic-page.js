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
    lengthDisableFlag: false,
    ageDisableFlag: false,
    sessionAlb: 0,
    sessionAub: 0,
    // cur_time: 0,
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
            this.set('ageDisableFlag', true);
        }

        if(this.session.length == -1) {
            this.set('lengthIf', false);
            this.set('inputChecked', '');
            this.set('inputNoChecked', 'checked');
            this.set('lengthDisableFlag', true);
        }
    },
    actions: {
        ageSelect() {
            if(this.ageInput == true) {
                this.set('ageInput', false);
                this.set('ageDisableFlag', true);
                this.set('session.alb', "-1")
                this.set('session.aub', "-1")
            } else {
                this.set('ageInput', true);
                this.set('ageDisableFlag', false);
                this.set('session.alb', "0")
                this.set('session.aub', "0")
            }
        },
        lengthNoSelected() {
            if(this.lengthIf == true) {
                this.set('lengthIf', false);
                this.set('lengthDisableFlag', true);
                this.set('session.length', -1)
                // this.set('cur_time', "")
            } else {
                this.set('lengthIf', true);
                this.set('lengthDisableFlag', false);
                this.set('session.length', 0)
                // this.set('cur_time', 0)
            }
        },
        onKeyPress(value) {
            // debugger
            let regex = new RegExp(/^[0-9]+(.[0-9]{2})?$/);
            // console.log(value)
            // console.log(event)
            // debugger
            if(regex.test(value)) {
                return;
            } else {
                if (event && event.preventDefault ){
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
