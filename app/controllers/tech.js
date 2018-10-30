import Controller from '@ember/controller';

export default Controller.extend({
    classNames: "tech",
    actions: {
        cardClicked(idx) {
            this.transitionToRoute('detail.tech', idx);
        },
        addTech() {
            this.transitionToRoute('edit.tech')
        }
    }
});
