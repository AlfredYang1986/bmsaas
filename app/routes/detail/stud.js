import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
    mock_data: service(),

    model(params) {
        // this.mock_data.sureStud();
        // // let stud = this.store.peekRecord('bmstud', params.studid);
        // let stud = "detail.stud";
        // if (stud == null) {
        //     this.transitionTo('home');
        // }
        //
        // return RSVP.hash({
        //         stud: stud
        //     })
        let request = this.get('pmController').get('Store').createModel('request', {
            id: this.guid(),
            res: 'BmAttendee',
        });

        let eqValues = [
            { id: 1, type: 'eqcond', key: "id", val: this.guid()},
        ]
        eqValues.forEach((elem) => {
            request.get(elem.type).pushObject(this.get('pmController').get('Store').createModel(elem.type, {
                id: elem.id,
                key: elem.key,
                val: elem.val,
            }))
        });
        let json = this.get('pmController').get('Store').object2JsonApi(request);
        this.get('logger').log(json)
        return this.get('pmController').get('Store').queryObject('/api/v1/findattendee/0', 'bm-attendees', json)
            .then(data => {
                this.get('logger').log(data);
                return data;
            })
            .catch(data => {
                this.get('logger').log(data);
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
