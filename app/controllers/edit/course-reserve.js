import Controller from '@ember/controller';

export default Controller.extend({

    start_date: new Date(),
    end_date: new Date(),

    selected_index: 0,

    actions: {
        addReserveCourseBtnClicked() {
            console.log('save reserve editing');
            if (!this.reserveValidate()) {
                alert('something wrong!');
                return ;
            }

            let reserve = this.store.createRecord('bmreservable', {
                id: this.guid()
            })

            let course = this.model.course[this.selected_index];
            reserve.set('course', course);

            this.transitionToRoute('courseReserve')
        }
    },

    reserveValidate() {
        return this.selected_index > -1;
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
