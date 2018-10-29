import Controller from '@ember/controller';

export default Controller.extend({
    selectedYard: '',
    actions: {
        yardChanged() {
            var sel = document.getElementById("yardselect");
            this.set('selectedYard', sel.options[sel.selectedIndex].value);
        }
    }
});
