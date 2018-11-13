import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
    bm_tech_service: service(),
    guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },
    setupController(controller, model) {
        this._super(controller, model);
        this.bm_tech_service.set('refresh_all_token', this.bm_tech_service.guid());
    }
});
