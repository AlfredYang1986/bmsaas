import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { A } from '@ember/array';

export default Route.extend({
    model(params) {
        return RSVP.hash({
            multiData: A(['姓名', '性别', '年龄', '联系方式']),
            filterData: A(['教师', '职责', '手机', '微信']),
        })
    }
});
