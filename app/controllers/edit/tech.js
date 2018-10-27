import Controller from '@ember/controller';

export default Controller.extend({

    tech_name: '',
    tech_nickname: '',
    tech_gender: '',
    tech_homeland: '',
    tech_contact: '',
    tech_address: '',
    tech_wechat: '',

    isPushing: false,

    actions: {
        saveTechBtnClicked() {
            console.log('save tech editing');

            if (!this.techValidate()) {
                alert('something wrong !');
                return;
            }

            let tech = null;
            if (this.isPushing) {
                tech = this.store.createRecord('bmtech', {
                    id: this.guid()
                })
                let per_tech = this.store.createRecord('bmperson', {
                    id: this.guid()
                })
                tech.set('me', per_tech);
            } else {
                tech = this.model.tech;
            }

            tech.me.set('name', this.tech_name);
            // TODO: 其他一些属性的修改

            if (this.isPushing) {
                this.transitionToRoute('tech');
            } else {
                this.transitionToRoute('detail.tech', tech.id);
            }
        }
    },

    techValidate() {
        return this.tech_name.length != 0;
    },

    guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
});
