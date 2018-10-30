import Controller from '@ember/controller';

export default Controller.extend({

    start_date: '2018-10-01',
    end_date: '2018-11-11',

    savedlg: false,

    selected_index: 0,

    actions: {

        cancelHandled() {
            this.set('start_date', '2018-10-01');
            this.set('end_date', '2018-11-01');
            this.set('selected_index', -1);
            this.set('savedlg', false);
        },
        successHandled() {
            if (this.addReserveCourseBtnClicked()) {
                this.transitionToRoute('courseReserve');
            }
            
            this.set('start_date', '2018-10-01');
            this.set('end_date', '2018-11-01');
            this.set('selected_index', -1);
            this.set('savedlg', false);
        },
        resCouresSelect() {
            debugger
            let sel = document.getElementById('rescourseselect');
            this.set('selected_index', sel.selected_index);
        },
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
    },

    addReserveCourseBtnClicked() {
        console.log('save reserve editing');
        if (!this.reserveValidate()) {
            alert('something wrong!');
            return false;
        }

        let reserve = this.store.createRecord('bmreservable', {
            id: this.guid()
        })

        let course = this.model.course[this.selected_index];
        reserve.set('course', course);

        return true;
    },
});
