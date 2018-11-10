import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
    mock_data: service(),
    model() {
        // this.mock_data.sureYard();
        // let yards = this.store.peekAll('bmyard');
        //
        // return RSVP.hash({
        //         yards: yards
        //     })

        let request = this.get('pmController').get('Store').createModel('request', {
            id: this.guid(),
            res: 'BmYard',
            fmcond: this.get('pmController').get('Store').createModel('fmcond', {
                id: this.guid(),
                skip: 0,
                take: 0,
            })
        })
        let json = this.get('pmController').get('Store').object2JsonApi(request);
        this.get('logger').log(json)

        return this.get('pmController').get('Store').queryMultipleObject('/api/v1/findyardmulti/0', 'bm-yard', json)
            .then(data => {
                this.get('logger').log('qqqqqqqqqqqqqqqqqqqqq')
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
