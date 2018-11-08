import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
    mock_data: service(),
    model() {
        // this.mock_data.sureStud();
        // let studs = this.store.peekAll('bmstud');
        //
        // return RSVP.hash({
        //         studs: studs
        //     })

        let request = this.get('pmController').get('Store').createModel('request', {
            id: this.guid(),
            res: 'BmAttendee',
            fmcond: this.get('pmController').get('Store').createModel('fmcond', {
                id: this.guid(),
                skip: 0,
                take: 0
            })
        });

        let json = this.get('pmController').get('Store').object2JsonApi(request);
        this.get('logger').log(json);

        return this.get('pmController').get('Store').queryMultipleObject('/api/v1/findattendeemulti/0', 'bm-attendees', json)
            .then(data => {

                data.forEach(index => {
                    let dob = index.Person.dob;
                    let age = this.getAge(dob);
                    this.get('logger').log(age);
                    this.set(index.Person.dob, age)
                })
                // this.set('data', data);
                // this.get('logger').log(data.firstObject.Person.dob);
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
  },
  getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m <0 || (m === 0 && today.getDate() <birthDate.getDate())) {
        age--;
    }
    return age;
  }

});
