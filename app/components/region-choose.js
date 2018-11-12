import Component from '@ember/component';

export default Component.extend({
    positionalParams: ['province', 'city', 'area'],
    tagName: '',
    province: '',
    city: '',
    area: '',
    actions: {
        changeProvinces(value) {
            // this.sendAction('changeProvinces', value)
            this.province = value
        },
        changeCitys(value) {
            // this.sendAction('changeCitys', value)
            this.city = value
        },
        changeGovernmentAreas(value) {
            // this.sendAction('changeGovernmentAreas', value) 
            this.area = value
        }
    }
});
