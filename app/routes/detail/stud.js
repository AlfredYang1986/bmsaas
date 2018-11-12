import Route from '@ember/routing/route';
import RSVP from 'rsvp';
// import { computed } from '@ember/object';
// import { inject as service } from '@ember/service';

export default Route.extend({
    // mock_data: service(),

    model(params) {
        // this.mock_data.sureStud();
        // let stud = this.store.peekRecord('bmstud', params.studid);
        // if (stud == null) {
        //     this.transitionTo('home');
        // }

        let request = this.get('pmController').get('Store').createModel('request', {
            id: this.guid(),
            res: 'BmAttendee',
        });

        let eqd = this.get('pmController').get('Store').createModel('eqcond', {
            id: this.guid(),
            type: 'eqcond',
            key: 'id',
            val: params.studid
        })
        request.get('eqcond').pushObject(eqd);

        let json = this.get('pmController').get('Store').object2JsonApi(request);
        this.get('logger').log(json);

        let studs = this.get('pmController').get('Store').queryObject('/api/v1/findattendee/0', 'bm-attendees', json)
            .then(data => {
                this.get('logger').log(data);
                return data;
            })
            .catch(data => {
                this.get('logger').log(data);
            })

            return RSVP.hash({
                studs: studs
            })
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
