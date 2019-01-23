import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
    selectedYard: '',
    refreshSelected: computed(function(){
        var sel = document.getElementById("yardselect");
        this.set('selectedYard', sel.options[sel.selectedIndex].value);
        return '';
    }),
    actions: {
        yardChanged() {
            var sel = document.getElementById("yardselect");
            this.set('selectedYard', sel.options[sel.selectedIndex].value);
        }
    }
});
