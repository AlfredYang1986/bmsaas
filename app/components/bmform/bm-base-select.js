import Component from '@ember/component';

export default Component.extend({
    positionalParams: ['selTitle', 'options', 'curSelect'],

    actions: {
        selectedChange() {
            let sel = document.getElementById("selId");
            this.set('sel', sel)
            if (sel.selectedIndex == 0) {
                this.set('curSelect', null);
            } else {
                this.set('curSelect', sel.options[sel.selectedIndex].value);
            }
        }
    },
});
