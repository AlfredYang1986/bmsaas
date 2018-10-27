import Component from '@ember/component';

export default Component.extend({
    positionalParams: ['tech'],
    click() {
        this.onTechCardClicked(this.tech.get('id'));
    }
});
