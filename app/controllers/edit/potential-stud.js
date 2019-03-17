import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default Controller.extend({
    showAddSelect: false,
    showAddStud: false,
    inputVal: false,
    studList: false,
    sex_idx: 0,
    rela_idx: 0,
    genderCheck: A(['男', '女']),
    relaChecked: A(['父亲', '母亲', '其他']),

    studs: computed("refreshFlag", function() {
        // return this.store.query('student', { 'page[number]': 1, 'page[size]': 20, "brand-id": localStorage.getItem("brandid")})
        let result;
        result = this.store.query('student', { 'page[number]': 1, 'page[size]': 20, 'status': 0, "brand-id": localStorage.getItem("brandid")});
        result.then(() => {
        }, error => {
            this.bm_error_service.handleError(error)
        })
        return result;
    }),
    sex: computed('sex_idx', function() {
        return ;
    }),

    rela: computed('rela_idx', function() {
        return ;
    }),
    actions: {
        closeProcess() {
            this.transitionToRoute('potential-stud')
        },
        successHandled() {
            this.set('showAddSelect', false);
            this.set('showAddStud', true);
        },
        cancelHandled() {
            this.set('showAddSelect', false)
        },
        cancelAdd() {
            this.set('showAddStud', false)
        },
        successAdd() {

        },
        addPtStud() {
            this.set('showAddStud', true);
        },
        searchStud() {
            
        }
    }
});
