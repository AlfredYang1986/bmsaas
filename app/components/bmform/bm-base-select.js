import Component from '@ember/component';

export default Component.extend({
    positionalParams: ['selTitle', 'options', 'curSelect', 'pHolder', "selId", "type"],
    type: "",
    pHolder: "请选择",
    selId: "selId",
    actions: {
        selectedChange() {
            let sel = document.getElementById(this.selId);
            this.set('sel', sel)
            if (sel.selectedIndex == 0) {
                this.set('curSelect', null);
            } else {
                if(this.type == "number") {
                    this.set('curSelect', parseInt(sel.options[sel.selectedIndex].value));
                } else {
                    this.set('curSelect', sel.options[sel.selectedIndex].value);
                }
            }
        }
    },
});
