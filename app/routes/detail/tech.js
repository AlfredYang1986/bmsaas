import Route from '@ember/routing/route';
import RSVP from 'rsvp';
// import { computed } from '@ember/object';
// import { inject as service } from '@ember/service';

export default Route.extend({
    // mock_data: service(),

    model(params) {
        // this.mock_data.sureTech();
        // let tech = this.store.peekRecord('bmtech', params.techid);
        // if (tech == null) {
            // this.transitionTo('home');
        // } 

        let request = this.get('pmController').get('Store').createModel('request', {
            id: this.guid(),
            res: 'BmTeacher',
        });
        let eqd = this.get('pmController').get('Store').createModel('eqcond', {
            id: this.guid(),
            type: 'eqcond',
            key: 'id',
            val: params.techid
        })
        request.get('eqcond').pushObject(eqd);

        let json = this.get('pmController').get('Store').object2JsonApi(request);

        let tech = this.get('pmController').get('Store').queryObject('/api/v1/findteacher/0', 'bm-teacher', json)
            .then(data => {
                this.get('logger').log(data);
                return data;
            })
            .catch(data => {
                this.get('logger').log(data);
            })

        return RSVP.hash({
                tech : tech
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
});
