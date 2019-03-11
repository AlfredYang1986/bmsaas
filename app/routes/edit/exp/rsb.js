import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { A } from '@ember/array';

export default Route.extend({
    model() {
        let exp = this.store.createRecord('reservableitem');
        exp.set("status", 1)  // TODO: 体验课的status？1？2
        let si = this.store.createRecord('sessioninfo');
        si.set("status", 1)
        let cate = this.store.createRecord('category');
        cate.set('title', '请选择');
        cate.set('subTitle', "体验课")
        cate.save();
        si.set('category', cate);

        return RSVP.hash({
                exp: exp,
                si: si,
                describe: A(["体验课分类","基本信息","内容介绍","与孩子互动", "体验图片",]),
                guide: A(["宝贝将获得","将为宝贝提供","参与者需自带","陪同说明", "须知",]),
            })
    },

    setupController(controller, model) {
        this._super(controller, model);
        controller.set('cur_page_idx', 0);
        if(model.si.category.get("id")) {
            controller.set("cur_cate_id", model.si.category.get("title"));
        } else {
            controller.set("cur_tech_id", "");
        }
    },
});
