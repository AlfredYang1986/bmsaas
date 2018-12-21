import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    bm_stud_service: service(),
    cur_idx: 0,
    qrCode: 'https://bm-web.oss-cn-beijing.aliyuncs.com/icon_QR.png',
    headImg: 'https://bm-web.oss-cn-beijing.aliyuncs.com/avatar_defautl_96px%20%401x.png',
});
