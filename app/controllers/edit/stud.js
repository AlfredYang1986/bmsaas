import Controller from '@ember/controller';

export default Controller.extend({
    brand_name: "",

    actions: {
        showValication() {
            alert(this.brand_name);
        }
    }
});
