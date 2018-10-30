import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Controller.extend({
    store: service(),
    mock_data: service(),

    changeClassName: false,
    clsNewName: '',

    delclsdlg: false,
    techdlg: false,
    tech_lst: computed(function(){
        return this.mock_data.queryAllTech();
    }),
    techid_lst: A(),

    studdlg: false,
    stud_lst: computed(function(){
        return this.mock_data.queryAllStud();
    }),
    studid_lst: A(),
  
    refresh_token: "start-token",
    session_lst: computed('refresh_token', function(){
        let tmp = this.model.cls.session;
        return tmp.sortBy('start_date');
    }),

    arrangeClass: true,
    classDetails: false,
    traineesLists: false,
    actions: {
        arrangeClass() {
            this.set('arrangeClass', true);
            this.set('classDetails', false);
            this.set('traineesLists', false);
        },
        classDetails() {
            this.set('arrangeClass', false);
            this.set('classDetails', true);
            this.set('traineesLists', false);
        },
        traineesLists() {
            this.set('arrangeClass', false);
            this.set('classDetails', false);
            this.set('traineesLists', true);
        },
        goToarrangeClass() {
            this.transitionToRoute('arrange-class');
        },

        cancelChangeNameHandled() {
            this.set('clsNewName', '');
            this.set('changeClassName', false);
        },
        successChangeNameHandled() {
            this.model.cls.set('name', this.clsNewName);

            this.set('clsNewName', '');
            this.set('changeClassName', false);
        },
        cancelDelClsHandled() {
            this.set('delclsdlg', false);
        },
        successDelClsHandled() {
            this.store.unloadRecord(this.model.cls);
            this.set('delclsdlg', false);
            this.transitionToRoute('classes');
        },
        cancelTechHandled() {
            this.set('techid_lst', A());
            this.set('techdlg', false);
        },
        successTechHandled() {
            let ts = A();
            for (let idx = 0; idx < this.techid_lst.length; idx++) {
                let tmp = this.store.peekRecord('bmtech', this.techid_lst.objectAt(idx));
                ts.pushObject(tmp);
            }
            this.model.cls.set('tech', ts);

            this.set('techid_lst', A());
            this.set('techdlg', false);
        },
        oneTechChecked(techid, checked) {
            if (checked) {
                this.techid_lst.pushObject(techid);
            } else {
                this.techid_lst = this.techid_lst.removeObject(techid);
            }
        },
        cancelStudHandled() {
            this.set('studid_lst', A());
            this.set('studdlg', false);
        },
        successStudHandled() {
            let ts = A();
            for (let idx = 0; idx < this.studid_lst.length; idx++) {
                let tmp = this.store.peekRecord('bmstud', this.studid_lst.objectAt(idx));
                ts.pushObject(tmp);
            }
            this.model.cls.set('stud', ts);

            this.set('studid_lst', A());
            this.set('studdlg', false);
        },
        oneStudChecked(studid, checked) {
            if (checked) {
                this.studid_lst.pushObject(studid);
            } else {
                this.studid_lst = this.studid_lst.removeObject(studid);
            }
        },
    },
    arrangedDate: computed(function(){
        if (this.model.cls != null || this.model.cls.get('start_date') == null) {
            return '没有安排';
        } else {
            let s = this.model.cls.get('start_date');
            let e = this.model.cls.get('end_date');
            return s.getFullYear() + '/' + (s.getMonth() + 1) + '/' + s.getDate() + 
                ' ---- ' + e.getFullYear() + '/' + (e.getMonth() + 1) + '/' + e.getDate()
        }
    }),
});
