import Component from '@ember/component';

export default Component.extend({
    positionalParams: ['province', 'city', 'area'],
    tagName: '',
    province: '',
    city: '',
    area: '',
    actions: {
        changeProvinces(value) {
            this.set('province', value);
        },
        changeCitys(value) {
            this.set('city', value);
        },
        changeGovernmentAreas(value) {
            this.set('area', value);
        }
    }
});
