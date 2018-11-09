import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
    isFemale: computed('model', function(){
        return this.model.studs.get('gender') == 0;
    }),
    isMale: computed('model', function(){
        return this.model.studs.get('gender') == 1;
    }),
    registerDate: computed('model', function(){
        let d = this.model.studs.get('register_date');
        return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    }),
});
