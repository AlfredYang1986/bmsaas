import Component from '@ember/component';

export default Component.extend({
    courseReserve: true,
    experienceApply: false,
    actions: {
        courseReserve() {
            console.log("1111")
            this.set('courseReserve', true);
            this.set('experienceApply', false);
        },
        experienceApply() {
            console.log("2222")
            this.set('experienceApply', true);
            this.set('courseReserve', false)
        }
    }


});
