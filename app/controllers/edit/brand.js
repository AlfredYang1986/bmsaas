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


            let brand = this.model.brand;
            brand.set('title', this.title);
            brand.set('subtitle', this.subtitle);
            brand.set('brand_story', this.brand_story);
            brand.set('team_des', this.team_des);
            brand.set('slogan', this.slogan);
            brand.set('brand_tags', this.brand_tags);

            this.transitionToRoute('home');
        }
    }
});
