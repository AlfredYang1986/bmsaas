import Controller from '@ember/controller';

export default Controller.extend({
    collapsed: true,
    actions: {
        expendMenu() {

        },
        toggle() {
            if (this.collapsed) this.collapsed = false;
            else this.collapsed = true;
        }
    }
});
