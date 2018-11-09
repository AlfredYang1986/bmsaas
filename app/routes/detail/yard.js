import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
    mock_data: service(),

    model(params) {
        // this.mock_data.sureYard();
        // let yard = this.store.peekRecord('bmyard', params.yardid);
        // if (yard == null) {
        //     this.transitionTo('home');
        // }
        //
        // return RSVP.hash({
        //         yard: yard
        //     })

        let request = this.get('pmController').get('Store').createModel('request', {
            id: this.guid(),
            res: "BmYard",
        });
        request.get('eqcond').pushObject(this.get('pmController').get('Store').createModel('eqcond', {
            id: this.guid(),
            type: 'eqcond',
            key: 'id',
            val: params.yardid
        }));
        let json = this.get('pmController').get('Store').object2JsonApi(request);
        this.get('logger').log(json)
        return this.get('pmController').get('Store').queryObject('/api/v1/findyard/0', 'bm-yard', json)
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
    },
});
