import Component from '@ember/component';

export default Component.extend({
    positionalParams: ['start_date', 'end_date'],
    classNames: ['bm-view-container'],
    tagName: 'div',
    actions: {
        onPanelClick(param) {
            this.onPanelClick(param);
        }
    },
});
