import Controller from '@ember/controller';

export default Controller.extend({

    yard_title: '',
    yard_detail_address: '',
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

    yard_selected_province: null,
    yard_selected_city: null,
    yard_selected_government_areas: null,

    isPushing: false,

    yardCandidate: ['室内', '室外', '室内 + 室外'],
    surroundings: ['社区', '商圈', '校区', '写字楼', '户外', '露天', '闹市区'],
    actions: {
        saveYardBtnClicked() {
            // if (!this.yardValidate()) {
            //     alert('something wrong !');
            //     return;
            // }

            let yard = null;
            if (this.isPushing) {
                // let region = this.store.peekRecord('bm-region', '1')
                // yard = this.store.createRecord('bmyard', {
                //     id: this.guid()
                // })
                // yard.set('region', region)
                yard = this.get('pmController').get('Store').createModel('bm-yard', {
                    id: this.guid(),
                    title: this.yard_title,
                    cover: this.yard_cover,
                    description: this.yard_des,
                    around:  this.yard_around,
                    facilities: ["场地友好性","是啥"],
                    province: this.yard_selected_province,
                    city: this.yard_selected_city,
                    district: this.yard_selected_government_areas,
                    traffic_info: this.yard_detail_address,
                    attribute: '室内',
                    scenario: "",
                    address: "",
                    friendly: ["场地友好性","是啥"]
                });
                yard.get('Rooms').pushObject(this.get('pmController').get('Store').createModel('bm-room', {
                    id: this.guid(),
                    title: "哈哈哈",
                    capacity: 111,
                }))
                yard.get('Rooms').pushObject(this.get('pmController').get('Store').createModel('bm-room', {
                    id: this.guid(),
                    title: "eee",
                    capacity: 222,
                }))
                yard.get('Tagimgs').pushObject(this.get('pmController').get('Store').createModel('bm-tag-img', {
                    id: this.guid(),
                    img: "111.jpeg",
                    tag: "lol",
                }))
                yard.get('Tagimgs').pushObject(this.get('pmController').get('Store').createModel('bm-tag-img', {
                    id: this.guid(),
                    img: "222.jpeg",
                    tag: "olo",
                }))

                 let json = this.get('pmController').get('Store').object2JsonApi(yard)
                 this.get('logger').log(json);
                 this.get('pmController').get('Store').transaction('/api/v1/pushyard/0', 'bm-yard', json)
                    .then(data => {
                        this.get('logger').log(data);
                    })
                    .catch(data => {
                        this.get('logger').log(data);
                    })
            } else {
                this.get('logger').log('Error');
            }

            // TODO: 其他一些属性的修改
            // yard.set('title', this.yard_title);
            // yard.set('description', this.yard_des);
            // yard.set('ardes', this.yard_ardes);
            // yard.set('around', this.yard_around);
            // yard.set('parking', this.yard_parking);
            // yard.set('embag', this.yard_embag);
            // yard.set('detail_address', this.yard_detail_address);
            // let region = yard.region;
            // if (this.yard_selected_province) region.set('province', this.yard_selected_province);
            // if (this.yard_selected_city) region.set('city', this.yard_selected_city);
            // if (this.yard_selected_government_areas) region.set('governmentArea', this.yard_selected_government_areas);


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
