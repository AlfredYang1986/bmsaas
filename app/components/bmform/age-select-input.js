import Component from '@ember/component';

export default Component.extend({
    actions: {
        ageSelect() {
            this.sendAction('ageSelect');
            if(this.alb == -1) {
                this.set('alb', 0);
                this.set('aub', 0);
            } else {
                this.set('alb', -1);
                this.set('aub', -1);
            }
        }
    }
});
