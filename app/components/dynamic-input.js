import Component from '@ember/component';
import EmberObject from '@ember/object';

const inputObject = EmberObject.extend({});
export default Component.extend({
    tagNmae: '',
    
    init() {
        this._super(...arguments);
        this.listInputs.pushObject(inputObject.create({id: 1, text: ''}))
    },
    actions: {
        addProject() {
            let id = this.listInputs.length + 1
            this.listInputs.pushObject(inputObject.create({id, text: ''}))
        },
        remove(id) {
            if (this.listInputs.length > 1 ) {
                let res = this.listInputs.filter(elem => elem.id !== id).map((elem, index) => {
                    elem.set('id', index + 1)
                    return elem
                })

                this.set('listInputs', res);
            }
        }
    }
});
