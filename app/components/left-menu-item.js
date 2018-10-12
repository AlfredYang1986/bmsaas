import Component from '@ember/component';

export default Component.extend({
    collapsed: false,
    positionalParams: ['icon', 'title', 'expendable'],
    actions: {
        toggle2() {
            if (this.collapsed) this.collapsed = false;
            else this.collapsed = true;
        }
    }

});
