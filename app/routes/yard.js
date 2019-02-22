import Route from '@ember/routing/route';

export default Route.extend({
    setupController(controller, model) {
        this._super(controller, model);
        this.bm_yard_service.set('refresh_all_token', this.bm_yard_service.guid());
    }
});
