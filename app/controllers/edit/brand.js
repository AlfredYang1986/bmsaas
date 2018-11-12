import Controller from '@ember/controller';

export default Controller.extend({
    title: "",
    subtitle: "",
    brand_story: "",
    team_des: "",
    slogan: "",
    brand_tags: "",

    actions: {
        saveBrand() {

            let brand = null;
            brand = this.get('pmController').get('Store').createModel('request', {
                id: this.guid(),
                res: "BmBrand",
            });
            brand.get('eqcond').pushObject(this.get('pmController').get('Store').createModel('eqcond', {
                id: this.guid(),
                type: 'eqcond',
                key: 'id',
                val: this.model.brand.get('id'),
                category: "BmBrand",
            }));
            brand.get('upcond').pushObject(this.get('pmController').get('Store').createModel('upcond', {
                id: this.guid(),
                type: 'upcond',
                key: 'title',
                val: this.title,
                category: "BmBrand",
            }));
            brand.get('upcond').pushObject(this.get('pmController').get('Store').createModel('upcond', {
                id: this.guid(),
                type: 'upcond',
                key: 'subtitle',
                val: this.subtitle,
                category: "BmBrand",
            }));
            let json = this.get('pmController').get('Store').object2JsonApi(brand);
            this.get('logger').log(json)
            this.get('pmController').get('Store').transaction('/api/v1/updatebrand/0', 'request', json)
              .then(data => {
                  this.get('logger').log(data)
              })
              .catch(data => {
                  this.get('logger').log(data)
              })

            // let brand = this.model.brand;
            // brand.set('title', this.title);
            // brand.set('subtitle', this.subtitle);
            // brand.set('brand_story', this.brand_story);
            // brand.set('team_des', this.team_des);
            // brand.set('slogan', this.slogan);
            // brand.set('brand_tags', this.brand_tags);

            this.transitionToRoute('home');
        }
    },
    guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
});
