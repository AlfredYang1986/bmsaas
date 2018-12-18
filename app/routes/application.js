import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	cookies: service(),
	bm_brand_service: service(),
	beforeModel(transition) {
		let token = this.get('cookies').read('token'),
		loginController = this.controllerFor('index');

		if (!token) {
			if (transition.targetName !== 'index') {
				loginController.set('previousTransition', transition);
				loginController.set('applicationController', this.controllerFor('application'));
			}
			this.transitionTo('index');
		} else if (transition.targetName === 'index') {
			this.transitionTo('index');
		} else {
			this.bm_brand_service.set('refresh_token', this.bm_brand_service.guid());
		}
	},
});
