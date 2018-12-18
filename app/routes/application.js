import Route from '@ember/routing/route';
import { inject } from '@ember/service';
export default Route.extend({
    cookies: inject(),
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
		}
	},
});
