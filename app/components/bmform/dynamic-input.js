import Component from '@ember/component';
import EmberObject from '@ember/object';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import { set } from '@ember/object';

const inputObject = EmberObject.extend({});
export default Component.extend({
    tagNmae: '',
    classNames: 'bm-dynamic-input',
    // disabled: true,
    limit: 10,
    listInputs: A([]),
    innerData: A([]),
    // outputData: A([]),
    init() {
        this._super(...arguments);
        // console.log(this.listInputs)
        // this.set('inputTemp', this.listInputs.map(x => x));
        //变为内部自变量，内部component操作都属于闭环，也就是说放弃双向绑定 => DDAU，剩下的你想想怎么取这个内部的值，算是你的小任务，后续这个EmberObject应该会是EmberModel的形式展现，想想如何扩展
    },
    disabled: computed(function(){
        return this.innerData.length >= this.limit
    }),
    actions: {
        addProject() {
            if (this.innerData == null || this.innerData == "") {
                this.set('innerData', []);
            }
            if (this.innerData.length < this.limit) {
                let id = this.innerData.length + 1
                this.innerData.pushObject(inputObject.create({ id, text: '' }))
            }
            if (this.innerData.length +1 > this.limit) {
                this.set('disabled', true);
            }
            this.transToSourceFormat()
        },

        remove(id) {
            this.set("innerData", this.innerData.filter(elem => elem.id !== id).map((elem, index) => {
                set(elem, 'id', index + 1)
                return elem
            }))
            if(this.innerData.length  < this.limit) {
                this.set('disabled', false);
            }

            // this.set('innerData', res);
            this.transToSourceFormat()
        },
        onTextChange() {
            // e.preventDefault()
            this.transToSourceFormat()
        }
    },
    transToSourceFormat() {
        let tmpArr = [];
        for (let idx = 0;idx < this.innerData.length;idx++) {
            tmpArr.push(this.innerData[idx].text);
        }
        this.set("listInputs",tmpArr);
        // console.log(this.listInputs)
    },
    didReceiveAttrs() {
        let tmpArr= [];
        if(this.listInputs != null) {
            for (let idx = 0;idx < this.listInputs.length;idx++) {
                let item = {};
                item.id = idx + 1;
                item.text = this.listInputs[idx];
                tmpArr.push(item);
            }
        }
        this.set("innerData",tmpArr);
        // console.log(this.innerData)
    },
    // didRender() {
    //     this.transToSourceFormat()
    //     console.log(this.listInputs)
    // }
});
