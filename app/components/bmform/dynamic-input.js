import Component from '@ember/component';
import EmberObject, { observer } from '@ember/object';
import { A } from '@ember/array';

const inputObject = EmberObject.extend({});
export default Component.extend({
    tagNmae: '',
    listInputs: A([]),
    listInputsObs: A([]),
    inputObserver: observer('listInputsObs.@each.text', function() {
        // this.listInputsObs.forEach(elem => {
        //     this.listInputs.pushObject(elem.text)
        // });
        this.sendAction('inputs', this.listInputsObs);
    }),
    init() {
        this._super(...arguments);
        this.set('listInputsObs', []);
        if (this.listInputs !== undefined && this.listInputs.length > 0) {
            this.listInputs.forEach((elem, index) => {
                this.listInputsObs.pushObject(inputObject.create({ id: (index + 1), text: elem }))
            });
            this.set('listInputs', []);
        } else {
            this.listInputsObs.pushObject(inputObject.create({ id: 1, text: '' })) 
        }

    },
    actions: {
        addProject() {
            let id = this.listInputsObs.length + 1
            this.listInputsObs.pushObject(inputObject.create({ id, text: '' }))
        },
        remove(id) {
            if (this.listInputsObs.length > 1) {
                let res = this.listInputsObs.filter(elem => elem.id !== id).map((elem, index) => {
                    elem.set('id', index + 1)
                    return elem
                })

                this.set('listInputsObs', res);
            }
        }
    }
});
