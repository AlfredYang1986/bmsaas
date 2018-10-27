import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
    mock_data: service(),
    model() {
        this.mock_data.sureBrand();
        let brand = this.store.peekRecord('bmbrand', 'i am a brand');

        return RSVP.hash({
            brand: brand,
            brand_display_name: computed('brand', function(){
                return brand.found_date.get('year')+ '年' + brand.found_date.get('month')+ '月';
            })
        });
    },
});
