import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Route.extend({
    // mock_data: service(),
    bm_stud_service: service(),
    model(params) {
        this.bm_stud_service.set('studid', params.studid);

        return RSVP.hash({
            studid: params.studid,
            tabs: A(['详细信息']),
            urls: A([
                {
                    "pageName":"学生管理",
                    "link":"stud",
                    "id":"",
                },
                {
                    "pageName":"学生详情",
                    "link":"",
                    "id":"",
                }
            ]),
        })

    },
    setupController(controller, model) {
        this._super(controller, model);
        this.bm_stud_service.set('refresh_token', this.bm_stud_service.guid());
    },
});
