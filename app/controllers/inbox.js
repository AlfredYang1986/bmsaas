import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
    mock_data: service(),
    today_apply_count: computed(function(){
        return this.mock_data.todayApplies().length;
    }),
    older_apply_count: computed(function(){
        return this.mock_data.olderApplies().length;
    }),
    showhandledlg: false,
    current_apply: null,
    showcomfirmdlg: false,

    sr : null, 
    sy: null, 
    dt: '2018-10-01',

    sa: null,
    ss: null,
    isCourse: true,

    actions: {
        saveInfo() {
            this.set('modal3',false);
            let that = this;
            setTimeout(function() {
                that.set('saveInfo',true)
            },500);
        },
        setCurrentApply(item) {
            this.set('sr', null);
            this.set('sy', null);
            this.set('sa', null);
            this.set('ss', null);
            this.set('isV', false);
            this.set('current_apply', item);
            this.set('showhandledlg', true);
        },
        successSave() {
            this.set('saveInfo',false);
        },
        successHandled() {
            console.log(this.isCourse);
            if (this.checkValidate()) {
                if (this.isCourse) {
                    this.signCoureReserve();
                } else {
                    this.signActivityReserve();
                }
                this.current_apply.set('status', 1);
            }
            this.set('sr', null);
            this.set('sy', null);
            this.set('sa', null);
            this.set('ss', null);
            this.set('isV', false);
            this.set('current_apply', null);
            this.set('showhandledlg', false);
        },
        cancelHandled() {
            this.set('sr', null);
            this.set('sy', null);
            this.set('sa', null);
            this.set('ss', null);
            this.set('isV', false);
            this.set('current_apply', null);
            this.set('showhandledlg', false);
        },
    },
    checkValidate() {
        if (this.isCourse) {
            return this.sr != null && this.sy != null && this.dt.length > 0;
        } else {
            return this.sa != null && this.ss != null;
        }
    },
    signCoureReserve() {
        // debugger
        let course = this.store.peekRecord('bmreservable', this.sr);
        let yard = this.store.peekRecord('bmyard', this.sy);
        let attendee = this.current_apply.attendee;
        let tmp = [];
        for (let idx = 0; idx < attendee.length; idx++) {
            let person = attendee.objectAt(idx);
            let stud = this.store.createRecord('bmstud', {
                id: this.guid(),
                school: ''
            })
            stud.set('me', person);
            tmp.push(stud);
        }

        let res = this.store.createRecord('bmresrecord', {
            id: this.guid()
        })
        let tmp_date = new Date(this.dt);
        res.set('res_date', tmp_date);
        res.set('stud', tmp);
        res.set('yard', yard);

        res.set('reservable', course);
        // course.set('res', res);
    },
    signActivityReserve() {
        let period = this.store.peekRecord('bmactperiod', this.ss);
        let attendee = this.current_apply.attendee;
        let tmp = [];
        for (let idx = 0; idx < attendee.length; idx++) {
            let person = attendee.objectAt(idx);
            let stud = this.store.createRecord('bmstud', {
                id: this.guid(),
                school: ''
            })
            stud.set('me', person);
            tmp.push(stud);
        }
        period.set('studs', tmp);
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
