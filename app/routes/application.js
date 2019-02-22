import Route from '@ember/routing/route';

export default Route.extend({
	// cookies: service(),
	// bm_brand_service: service(),
	beforeModel(transition) {
		// let token = this.get('cookies').read('token'),
		let loginController = this.controllerFor('index');
		let token = false;
		document.cookie.split(";").map((ele) => {
			if(ele != undefined) {
				if(ele.indexOf('token') > -1) {
					token = true;
				}
			}
		});
		
		if (!token) {
			if (transition.targetName !== 'index') {
				loginController.set('previousTransition', transition);
				loginController.set('applicationController', this.controllerFor('application'));
			}
			this.transitionTo('index');
		} else if (transition.targetName === 'index') {
			this.transitionTo('index');
		} else {
			loginController.set('previousTransition', transition);
			loginController.set('applicationController', this.controllerFor('application'));
		}
	},
});
