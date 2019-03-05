import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'
import CustomError from '../adapters/error';

export default Route.extend({
	bm_token: service(),
    bm_error_service: service(),

	beforeModel(transition) {
		window.console.log(transition);
		// TODO: 下面代码我都没看懂，写的什么意思
		// if (!this.bm_token.isTokenValidata()) {
		// 	if (transition.targetName !== 'index') {
		// 		loginController.set('previousTransition', transition);
		// 		loginController.set('applicationController', this.controllerFor('application'));
		// 	}
		// 	this.transitionTo('index');
		// } else if (transition.targetName === 'index') {
		// 	this.transitionTo('index');
		// } else {
		// 	loginController.set('previousTransition', transition);
		// 	loginController.set('applicationController', this.controllerFor('application'));
		// }
		
		if (this.bm_token.isTokenValidata()) {
			// this.transitionTo('inbox');
		} else {
			this.transitionTo('index');
		}
	},

	actions:{
        error(error, transition) {
			// debugger
            // if (error instanceof CustomError) {
                window.console.log(error, transition);
                this.bm_error_service.handleError(error)
                return;
            // }
      
            // ...other error handling logic
        }
    },
});
