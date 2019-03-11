import Component from '@ember/component';

export default Component.extend({
    positionalParams: ['outHeight', 'cls'],
    tagName: 'div',
    classNames: ['class-content-panel'],
    attributeBindings: ['style'],
    // style: computed('outHeight', function(){
    //     return 'min-height: ' + (this.outHeight - 8) + "px;"
    // }),
    actions: {
        cardClicked(id) {
            this.onCardClicked(id);
        }
    }
});
