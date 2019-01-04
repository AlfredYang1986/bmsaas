import Component from '@ember/component';
import EmberObject from '@ember/object';
import { A } from '@ember/array';
import { set } from '@ember/object';

const inputObject = EmberObject.extend({});
export default Component.extend({
    tagNmae: '',
    classNames: 'bm-dynamic-input',
    disabled: false,
    listInputs: A([]),
    init() {
        this._super(...arguments);
        // console.log(this.listInputs)
        // this.set('inputTemp', this.listInputs.map(x => x));
        //变为内部自变量，内部component操作都属于闭环，也就是说放弃双向绑定 => DDAU，剩下的你想想怎么取这个内部的值，算是你的小任务，后续这个EmberObject应该会是EmberModel的形式展现，想想如何扩展
    },
    actions: {
        addProject() {
            if (this.listInputs == null || this.listInputs == "") {
                this.set('listInputs', []);
            }
            let id = this.listInputs.length + 1
            this.listInputs.pushObject(inputObject.create({ id, text: '' }))
        },

        remove(id) {
            let res = this.listInputs.filter(elem => elem.id !== id).map((elem, index) => {
                set(elem, 'id', index + 1)
                return elem
            })

            this.set('listInputs', res);
        },
        // sendHandledArr() {
        //     console.log(this.inputTemp)
        // }
    }
});
