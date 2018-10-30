import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
    mock_data: service(),
    
    model(params) {
        this.mock_data.sureReserve();
        let res = this.store.peekRecord('bmreservable', params.reid);
        if (res == null) {
            this.transitionTo('home');
        }

        return RSVP.hash({
            res : res,
            title: [{
                    title:"孩子姓名"
                },{
                    title:"联系方式"
                },{
                    title:"操作"
                }]
            })
    }
});
