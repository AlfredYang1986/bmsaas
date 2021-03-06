import Component from '@ember/component';

export default Component.extend({
    positionalParams: ['selTitle', 'options', 'curSelect', 'pHolder', "selId", "type", "disabled"],
    handleChangeFlag: false,
    idType: false,
    chooseReservable: false,
    chooseCourse: false,
    sessionId: "",
    type: "",
    pHolder: "请选择",
    selId: "selId",
    separator: "&and&",
    actions: {
        selectedChange() {
            let sel = document.getElementById(this.selId);
            this.set('sel', sel)
                if(this.type == "number") {
                    this.set('curSelect', Number(sel.options[sel.selectedIndex].value));
                } else if(this.type == "id") {
                    this.set('curSelect', sel.options[sel.selectedIndex].value);
                } else {
                    this.set('curSelect', sel.options[sel.selectedIndex].value.split(this.separator)[0]);
                    this.set('sessionId', sel.options[sel.selectedIndex].value.split(this.separator)[1]);
                }
            if (this.handleChangeFlag) {
                this.handleChange()
            }
        }
    },
});
