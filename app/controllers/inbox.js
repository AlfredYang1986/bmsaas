import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { debug } from '@ember/debug';

export default Controller.extend({
    cur_tab_idx: 0,
    cur_reserve_type: 0,

    toast: service(),
    tabs: A(['预约', '预注册']),
    toastOptions: {
        closeButton: false,
        positionClass: 'toast-top-center',
        progressBar: false,
        timeOut: '2000',
    },

    applies: computed('cur_tab_idx', 'cur_reserve_type', function() {
        return this.store.query('apply', { 'page[number]': 1, 'page[size]': 20, "brand-id": localStorage.getItem("brandid")})
    }),
    page_count: computed('cur_tab_idx', 'cur_reserve_type', function(){
        return Number.parseInt(localStorage.getItem('applies'));
    }),

    showhandledlg: false,
    showRegister: false,
    current_apply: null,
    current_edit_apply: null,
    showcomfirmdlg: false,
    isToday: false,

    sr : null,
    sy: null,
    dt: '2018-10-01',

    sa: null,
    ss: null,
    isCourse: true,
    noteError: false,
    noSr: false,
    contentSubmit: computed('sr', 'sa', function() {
        let a = Date.parse( new Date());
        debug(a)
        this.set('sy', null);
        this.set('ss', null);
        return this.sy == null && this.ss == null;
    }),
    couldSubmit: computed('sy', 'ss', function() {
        return this.sr != null && this.sy != null || this.sa != null && this.ss != null;
    }),
    actions: {
        handleBookPageChange (pageNum) {

        },
        handlePrePageChange (pageNum) {

        },
        handleTodayBookPageChange (pageNum) {

        },
        handleTodayPrePageChange (pageNum) {

        },
        onTabClicked(tabIdx) {

        },
        saveInfo() {
            this.set('modal3',false);
            let that = this;
            setTimeout(function() {
                that.set('saveInfo',true)
            },500);
        },
        setCurrentApply(item) {
            debug(item)
            this.set('sr', null);
            this.set('sy', null);
            this.set('sa', null);
            this.set('ss', null);
            this.set('isV', false);
            this.set('current_apply', item);
            this.set('showhandledlg', true);
        },

        successRegisterHandled(item) {
        },
        onPreRegisterClick(item) {

        },
        toggleAction() {

        },
        successSave() {

        },
        reserveTypeChanged() {
            let sel = document.getElementById('selectReserve');
            this.set("cur_reserve_type", sel.options[sel.selectedIndex].value);
        },
        preRegisterChanged() {

        },
        successHandled() {
            debugger
            if (this.current_apply.courseType == 1) {
                    this.signCoureReserve();
                } else if(this.current_apply.courseType == 0){
                    this.signActivityReserve();
                }
        },
        cancelHandled() {
            this.set('showhandledlg', false);
        },
        cancelRegisterHandled() {

        }
    },
    checkValidate() {
        
    },
    signCoureReserve() {

    },
    signActivityReserve() {
        let kid = this.current_apply.kids.firstObject;
        let stud = this.store.createRecord('student');
        stud.set('name', kid.name);
        stud.set('nickname', kid.nickname)
        stud.set('gender', kid.gender)
        stud.set('dob', kid.dob);
        stud.set('guardianRole', this.current_apply.applicant.name);
        stud.save();
    },
});
