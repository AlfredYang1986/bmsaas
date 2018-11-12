import Controller from '@ember/controller';

export default Controller.extend({
    classNames: "tech",
    actions: {
        cardClicked(idx) {
            this.transitionToRoute('detail.tech', idx);
        },
        addTech() {
            this.transitionToRoute('edit.tech',"tech/push")
        }
    },
    guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
      }
});
