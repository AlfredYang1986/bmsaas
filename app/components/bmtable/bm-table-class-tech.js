import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    classNames: ['bm-class-table'],
    positionalParams: ['titles'],
    bm_class_service: service(),
    actions : {
		onRemoveTeacherClick: function (params) {
			this.sendAction("onRemoveTeacherClick", params);
		},
    }
});
