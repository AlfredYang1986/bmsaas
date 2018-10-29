import Component from '@ember/component';

export default Component.extend({
    positionalParams: ['text', 'value'],
    isSelected: false,
    tagName: 'div',
    classNameBindings: [
        'siSelected:selected',
    ],
    click(event) {
        let arr = event.target.className.split(' ');
        if (arr.includes('selected')) {
            this.onUnselected(this);
        } else {
            this.onSelected(this);
        }
    }
});
