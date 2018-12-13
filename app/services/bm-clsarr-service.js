import Service from '@ember/service';
import { A } from '@ember/array';

export default Service.extend({
    bmstore: new JsonApiDataStore(),

    init() {
        this._super(...arguments);
        this.addObserver('refresh_all_token', this, 'queryMulti');
    },

    yardid: '',
    refresh_all_token: '',

    units: A(['a', 'b', 'c', 'd']),
});
