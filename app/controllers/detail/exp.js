import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    bm_exp_service: service(),
    cur_idx: 0
});
