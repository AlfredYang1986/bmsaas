import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
    mock_data: service(),

    model(params) {
        this.mock_data.sureActivity();
        let act = this.store.peekRecord('bmactivityinfo', params.actid);
        if (act == null) {
            this.transitionTo('home');
        }

        return RSVP.hash({
            act: act,
            title: [{
                    title:"场次号"
                },{
                    title:"时间段"
                },{
                    title:"场地"
                },{
                    title:"报名人数"
                },{
                    title:"操作"
                }]
            })
    }
});
