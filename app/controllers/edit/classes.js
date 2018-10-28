import Controller from '@ember/controller';

export default Controller.extend({
    selectClass: true,
    arrangeSite: false,
    className: false,
    showModal: false,
    actions: {
        selectClass() {
            this.set('selectClass', true);
            this.set('arrangeSite', false);
            this.set('className', false);
        },
        selectNext() {
            this.set('selectClass', false);
            this.set('className', false);
            this.set('arrangeSite', true);
        },
        arrangeNext() {
            this.set('arrangeSite', false);
            this.set('selectClass', false);
            this.set('className', true);
        },
        showModal() {
            this.set('showModal', true);
        },
        successPopUps() {
            this.set('pointPopUp', false);
            let that = this;
            setTimeout(function() {
                that.set('successPopUp', true);
            },1000)

        },
    }
});
