import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    classNames: ['bm-class-table'],
    positionalParams: ['titles'],
    bm_courseunit_service: service(),
    actions : {
        onArrcourseClick: function (params) {
			this.sendAction("onArrcourseClick", params);
        },
        onEditArrcourseClick: function (params) {
			this.sendAction("onEditArrcourseClick", params);
		},
		onRemoveArrcourseClick: function (params) {
			this.sendAction("onRemoveArrcourseClick", params);
		},
    }
});
