import Component from '@ember/component';

export default Component.extend({
    classNames: ['bm-class-table'],
    positionalParams: ['titles'],
    actions : {
        // onArrcourseClick: function (params) {
		// 	this.sendAction("onArrcourseClick", params);
        // },
        // onEditArrcourseClick: function (params) {
		// 	this.sendAction("onEditArrcourseClick", params);
		// },
		onRemoveArrcourseClick: function (params) {
            // this.sendAction("onRemoveArrcourseClick", params);
            this.onRemoveArrcourseClick(params);
		},
    }
});
