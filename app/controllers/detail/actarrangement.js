import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
    address: computed('model', function(){
        return this.model.period.yard.get('address');
    }),
    start_time: computed('model', function(){
        let date = this.model.period.start_date;
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }),
    end_time: computed('model', function(){
        let date = this.model.period.end_date;
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    })
});
