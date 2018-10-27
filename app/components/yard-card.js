import Component from '@ember/component';

export default Component.extend({
    positionalParams: ['yard'],
    click() {
        this.onYardCardClicked(this.yard.id);
    }
});
