import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
    mock_data: service(),
    model() {
        this.mock_data.sureApplies();
        let applies = this.store.peekAll('bmapply');

        return RSVP.hash({
            applies: applies,
            title: [{
                title:"状态"
            },{
                title:"时间"
            },{
                title:"场地"
            },{
                title:"内容标题"
            },{
                title:"孩子"
            },{
                title:"联系方式"
            },{
                title:"操作"
            }]
        })
    }
});
