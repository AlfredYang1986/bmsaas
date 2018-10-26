import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        saveInfo() {
            this.set('modal3',false);
            let that = this;
            setTimeout(function() {
                that.set('saveInfo',true)
            },500);
        },
        successSave() {
            this.set('saveInfo',false);
        }
    }
});
