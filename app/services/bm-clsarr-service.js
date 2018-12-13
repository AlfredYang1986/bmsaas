import Service from '@ember/service';
import { A } from '@ember/array';

export default Service.extend({
    bmstore: new JsonApiDataStore(),

    init() {
        this._super(...arguments);
        this.addObserver('refresh_all_token', this, 'queryMulti');
    },

    yardid: '',
    refresh_all_token: '',

    units: A(['今天要开会']),
    time_uints: A([
        {
            cls_name: '乐高机器人A班',
            session_name: '乐高机器人创意搭建课',
            start_time: 1544752800000,
            end_time: 1544760000000
        }
    ])
});
