import Controller from '@ember/controller';

export default Controller.extend({

    yard_title: '',
    yard_detail_address: '',
    yard_cover: '',
    yard_des: '',
    yard_around: '',
    yard_ardes: '',
    yard_facilities: '',

    yard_awards: null,

    yard_provinces: null,
    yard_citys: null,
    yard_government_areas: null,

    yard_selected_province: null,
    yard_selected_city: null,
    yard_selected_government_areas: null,

    isPushing: false,

    actions: {
        saveYardBtnClicked() {
            console.log('save tech editing');
            if (!this.yardValidate()) {
                alert('something wrong !');
                return;
            }

            let yard = null;
            if (this.isPushing) {
                let region = this.store.peekRecord('bmregion', '1')
                yard = this.store.createRecord('bmyard', {
                    id: this.guid()
                })
                yard.set('region', region)
            } else {
                yard = this.model.yard;
            }

            yard.set('title', this.yard_title);
            yard.set('detail_address', this.yard_detail_address);
            let region = yard.region;
            if (this.yard_selected_province) region.set('province', this.yard_selected_province);
            if (this.yard_selected_city) region.set('city', this.yard_selected_city);
            if (this.yard_selected_government_areas) region.set('governmentArea', this.yard_selected_government_areas);
            
            
            // TODO: 其他一些属性的修改

            if (this.isPushing) {
                this.transitionToRoute('yard');
            } else {
                this.transitionToRoute('detail.yard', yard.id);
            }
        },
        changeProvinces(value) {
            let province = this.store.peekRecord('bmprovinces', value);
            this.set('yard_selected_province', province);
            // let region = this.model.yard.region;
            // region.set('province', province);
        },
        changeCitys(value) {
            let city = this.store.peekRecord('bmcitys', value);
            this.set('yard_selected_city', city);
            // let region = this.model.yard.region;
            // region.set('city', city);
        },
        changeGovernmentAreas(value) {
            let area = this.store.peekRecord('bmgovernment-areas', value);
            this.set('yard_selected_government_areas', area);
            // let region = this.model.yard.region;
            // region.set('governmentArea', area);
        }
    },

    yardValidate() {
        return this.yard_title.length != 0;
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
