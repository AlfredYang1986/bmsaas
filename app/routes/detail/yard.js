import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Route.extend({
    bm_yard_service: service(),
    bm_room_service: service(),

    model(params) {
        this.bm_yard_service.set('yardid', params.yardid);
        this.bm_room_service.set('yardid', params.yardid);

        return RSVP.hash({
            yardid: params.yardid,
            tabs: A(['校区信息', '教室/场地']),
            titles: A(["教室名称","使用类型",""]),
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
    setupController(controller, model) {
        this._super(controller, model);
        this.bm_yard_service.set('refresh_token', this.bm_yard_service.guid());
        this.bm_room_service.set('refresh_all_token', this.bm_room_service.guid());
    },
});
