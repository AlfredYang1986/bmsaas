import Controller from '@ember/controller';

export default Controller.extend({
    onTechCardClicked(idx) {
        this.transitionToRoute('detail.tech', idx);
    }
});
