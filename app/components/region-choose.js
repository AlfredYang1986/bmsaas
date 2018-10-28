import Component from '@ember/component';

export default Component.extend({
    tagName: '',
    actions: {
        changeProvinces(value) {
            this.sendAction('changeProvinces', value)
        },
        changeCitys(value) {
            this.sendAction('changeCitys', value)
        },
        changeGovernmentAreas(value) {
            this.sendAction('changeGovernmentAreas', value) 
        }
    }
});
