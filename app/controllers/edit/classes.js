import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
    store: service(),
    mock_data: service(),

    cur_index: 0,
    confirmdlg: false,
    successdlg: false,

    selected_course: null,
    course_lst: computed(function(){
        return this.mock_data.queryAllCourse();
    }),

    selected_yard: null,
    yard_lst: computed(function(){
        return this.mock_data.queryAllYard();
    }),

    insert_cls_name: '',

    isValidata: computed('selected_course', 'selected_yard', 'insert_cls_name', function(){
        return this.selected_course != null &&
                this.selected_yard != null &&
                    this.insert_cls_name.length > 0;
    }),

    actions: {
        cancelConirmBtnClicked() {
            this.set('selected_course', null);
            this.set('selected_yard', null);
            this.set('confirmdlg', false);
        },
        successConfirmBtnClicked() {
            if (this.isValidata) {
                let cls = this.store.createRecord('bmclass', {
                    id: this.guid(),
                })
                cls.set('course', this.selected_course);
                cls.set('yard', this.selected_yard);
                cls.set('name', this.insert_cls_name);

                this.set('successdlg', true);

            } else {
                alert('somethin wrong');
            }

            this.set('selected_course', null);
            this.set('selected_yard', null);
            this.set('confirmdlg', false);
        },
        cancelSuccessBtnClicked() {
            this.set('successdlg', false);
        },
        successSuccessBtnClicked() {
            this.set('successdlg', false);  
        },
        addClsChanged() {
            let sel = document.getElementById('addclsselect');
            if (sel.selectedIndex == 0) {
                this.set('selected_course', null);
            } else {
                let course_id = sel.options[sel.selectedIndex].value;
                let course = this.store.peekRecord('bmcourseinfo', course_id);
                this.set('selected_course', course);
            }
        },
        addYardChanged() {
            let sel = document.getElementById('addyardselect');
            if (sel.selectedIndex == 0) {
                this.set('selected_yard', null);
            } else {
                let yard_id = sel.options[sel.selectedIndex].value;
                let yard = this.store.peekRecord('bmyard', yard_id);
                this.set('selected_yard', yard);
            }
        },
        successPopUps() {
            this.set('pointPopUp', false);
            let that = this;
            setTimeout(function() {
                that.set('successPopUp', true);
            },1000)

        },
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
