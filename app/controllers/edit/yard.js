import Controller from '@ember/controller';

export default Controller.extend({

    yard_title: '',
    yard_cover: '',
    yard_des: '',
    yard_around: '',
    yard_ardes: '',
    yard_facilities: '',
    yard_parking: '',
    yard_embag: '',

    yard_awards: null,

    yard_provinces: null,
    yard_citys: null,
    yard_government_areas: null,

    isPushing: false,

    yardCandidate: ['室内', '室外', '室内 + 室外'],
    surroundings: ['社区', '商圈', '校区', '写字楼', '户外', '露天', '闹市区'],
    actions: {
        saveYardBtnClicked() {
            console.log('save tech editing');
            if (!this.yardValidate()) {
                alert('something wrong !');
                return;
            }

            let yard = null;
            if (this.isPushing) {
                yard = this.store.createRecord('bmyard', {
                    id: this.guid()
                })
            } else {
                yard = this.model.yard;
            }

            // TODO: 其他一些属性的修改
            yard.set('title', this.yard_title);
            yard.set('description', this.yard_des);
            yard.set('ardes', this.yard_ardes);
            yard.set('around', this.yard_around);
            yard.set('parking', this.yard_parking);
            yard.set('embag', this.yard_embag);

            if (this.isPushing) {
                this.transitionToRoute('yard');
            } else {
                this.transitionToRoute('detail.yard', yard.id);
            }
        },
        changeProvinces(value) {
            let province = this.store.peekRecord('bmprovinces', value);
            let region = this.model.yard.region;
            region.set('province', province);
        },
        changeCitys(value) {
            let city = this.store.peekRecord('bmcitys', value);
            let region = this.model.yard.region;
            region.set('city', city);
        },
        changeGovernmentAreas(value) {
            let area = this.store.peekRecord('bmgovernment-areas', value);
            let region = this.model.yard.region;
            region.set('governmentArea', area);
        }
    },

    yardValidate() {
        let valiFlag = true;
        if (this.yard_title.length == 0 ||
            this.yard_parking.length == 0 ||
            this.yard_embag.length == 0) {
          valiFlag = false;
        }
        return valiFlag;
        // return this.yard_title.length != 0;
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
