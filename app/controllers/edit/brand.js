import Controller from '@ember/controller';

export default Controller.extend({
    title: "",
    subtitle: "",
    brand_story: "",
    team_des: "",

    actions: {
        saveBrand() {
            console.log('abcde');

            let brand = this.model.brand;
            brand.set('title', this.title);
            brand.set('subtitle', this.subtitle);
            brand.set('brand_story', this.brand_story);
            brand.set('team_des', this.team_des);

            this.transitionToRoute('home');
        }
    }
});
