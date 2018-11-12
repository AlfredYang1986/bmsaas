import Route from '@ember/routing/route';
import RSVP from 'rsvp';
// import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
    mock_data: service(),

    model(params) {
        // this.mock_data.sureTech();
        // let yard = this.store.peekRecord('bmyard', params.yardid);
        // if (yard == null && params.yardid != 'yard/push') {
        //     this.transitionTo('home');
        // }

        let yard = null;
        if(params.yardid != 'yard/push') {
            let request = this.get('pmController').get('Store').createModel('request', {
                id: this.guid(),
                res: "BmYard",
            });
            request.get('eqcond').pushObject(this.get('pmController').get('Store').createModel('eqcond', {
                id: this.guid(),
                type: 'eqcond',
                key: 'id',
                val: params.yardid
            }));
            let json = this.get('pmController').get('Store').object2JsonApi(request);
            this.get('logger').log(json)

            async function getStud(tmp) {
                return await tmp.get('pmController').get('Store').queryObject('/api/v1/findyard/0', 'bm-yard', json)
                    .then(data => {
                        tmp.get('logger').log(data);
                        return data;
                    })
                    .catch(data => {
                        tmp.get('logger').log(data);
                        this.transitionTo('home');
                    })
            }
            yard = getStud(this)
        }

        return RSVP.hash({
                yard: yard
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
        controller.set('yard_provinces', this.store.peekAll('bmprovinces'));
        controller.set('yard_citys', this.store.peekAll('bmcitys'));
        controller.set('yard_government_areas', this.store.peekAll('bmgovernment-areas'));

        if (model.yard != null) {
            controller.set('yard_title', model.yard.get('title'));
            controller.set('yard_detail_address', model.yard.get('address'));
            controller.set('yard_des', model.yard.get('description'));
            controller.set('yard_attr', model.yard.get('attribute'));
            controller.set('yard_scenario', model.yard.get('scenario'));
            controller.set('yard_traffic', model.yard.get('traffic_info'));

            controller.set('yard_selected_province', model.yard.get('province'));
            controller.set('yard_selected_city', model.yard.get('city'));
            controller.set('yard_selected_government_areas', model.yard.get('district'));

            controller.set('isPushing', false);
        } else {
            controller.set('yard_title', ''),
            controller.set('yard_detail_address', '');
            controller.set('yard_cover', ''),
            controller.set('yard_des', ''),
            controller.set('yard_attr', ''),
            controller.set('yard_scenario', '');
            controller.set('yard_traffic', '');

            controller.set('yard_selected_province', '');
            controller.set('yard_selected_city', '');
            controller.set('yard_selected_government_areas', '');
            
            controller.set('isPushing', true);
        }
    },
    activate() {
        if (this.controller != null) {
            this.controller.set('current_idx', 0);
        }
    }
});
