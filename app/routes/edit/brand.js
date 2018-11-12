import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default Route.extend({
    mock_data: service(),
    model(params) {
        // this.mock_data.sureBrand();
        // let tmp = this.store.peekRecord('bmbrand', 'i am a brand');
        let brand = null;
        let request = this.get('pmController').get('Store').createModel('request', {
            id: this.guid(),
            res: "BmBrand"
        })

        let eqd = this.get('pmController').get('Store').createModel('eqcond', {
            id: this.guid(),
            type: 'eqcond',
            key: "id",
            val: '5be6a00b8fb80736e2ec9ba5',
        })
        request.get('eqcond').pushObject(eqd);
        let json = this.get('pmController').get('Store').object2JsonApi(request);
        this.get('logger').log(json);
        async function getStud(tmp) {
            return await tmp.get('pmController').get('Store').queryObject('/api/v1/findbrand/0', 'bm-brand', json)
                .then(data => {
                    tmp.get('logger').log(data);
                    return data;
                })
                .catch(data => {
                    tmp.get('logger').log(data);
                    this.transitionTo('home')
                })
        }
        brand = getStud(this)

        return RSVP.hash({
            brand: brand
        });
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
        // Call _super for default behavior
        this._super(controller, model);
        // Implement your custom setup after
        controller.set('title', model.brand.get('title'));
        controller.set('subtitle', model.brand.get('subtitle'));
        controller.set('brand_story', model.brand.get('foundStory'));
        controller.set('team_des', model.brand.get('edu_idea'));
        controller.set('slogan', model.brand.get('slogan'));
        controller.set('brand_tags', model.brand.get('brand_tags'))
        this.get('logger').log(model.brand.get('slogan'));
    },
});
