import Component from '@ember/component';

export default Component.extend({
    positionalParams: ['selTitle', 'options', 'curSelect', 'pHolder', "selId", "type"],
    chooseReservable: false,
    sessionId: "",
    type: "",
    pHolder: "请选择",
    selId: "selId",
    separator: "&and&",
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
                    this.set('curSelect', sel.options[sel.selectedIndex].value.split(this.separator)[0]);
                    this.set('sessionId', sel.options[sel.selectedIndex].value.split(this.separator)[1]);
                    // console.log(this.sel.options[sel.selectedIndex])
                    // console.log(this.sessionId)
                }
            }
        }
    },
});
