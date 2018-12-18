import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default Route.extend({
    mock_data: service(),
    
    model(params) {
        this.mock_data.sureActivity();
        let act = this.store.peekRecord('bmactivityinfo', params.actactid);
        let period = this.store.peekRecord('bmactperiod', params.perid);
        if (period == null || act == null) {
            this.transitionTo('home');
        }

        return RSVP.hash({
            act: act,
            period: period,
            title: [{
                title:"孩子姓名"
            },{
                title:"生日"
            },{
                title:"性别"
            },{
                title:"联系方式"
            },{
                title:"渠道"
            },{
                title:"操作"
            }]
        })
    }
});
