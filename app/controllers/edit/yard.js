import Controller from '@ember/controller';

export default Controller.extend({

    yard_title: '',
    yard_address: '',
    yard_cover: '',
    yard_des: '',
    yard_around: '',
    yard_ardes: '',
    yard_facilities: '',

    isPushing: false,

    actions: {
        saveYardBtnClicked() {
            console.log('save tech editing');
            if (!this.yardValidate()) {
                alert('something wrong !');
                return;
            }

            let yard = null;
            if (this.isPushing) {
                yard = this.store.createRecord('bmyard', {
                    id: this.guid()
                })
            } else {
                yard = this.model.yard;
            }

            yard.set('title', this.yard_title);
            // TODO: 其他一些属性的修改

            if (this.isPushing) {
                this.transitionToRoute('yard');
            } else {
                this.transitionToRoute('detail.yard', yard.id);
            }
        }
    },

    yardValidate() {
        return this.yard_title.length != 0;
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
