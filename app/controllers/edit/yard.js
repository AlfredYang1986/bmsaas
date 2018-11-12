import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default Controller.extend({

    yard_title: '',
    yard_detail_address: '',
    yard_cover: '',
    yard_des: '',

    yard_attr: '',
    yard_scenario: '',
    yard_traffic: '',
    yard_tagimgs: A([]),
    
    yard_selected_province: '',
    yard_selected_city: '',
    yard_selected_government_areas: '',

    yard_provinces: null,
    yard_citys: null,
    yard_government_areas: null,

    isPushing: false,
    current_idx: 0,

    yardCandidate: ['室内', '室外', '室内 + 室外'],
    surroundings: ['社区', '商圈', '校区', '写字楼', '户外', '露天', '闹市区'],
    tagsCandi: ['阅读区', '教学区', '家长休息区', '生活区', '寄存区', '户外活动区', '室内活动区'],

    actions: {
        saveYardBtnClicked() {
            // if (!this.yardValidate()) {
            //     alert('something wrong !');
            //     return;
            // }

            let yard = null;
            if (!this.isPushing) {
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
                    traffic_info: this.yard_around,
                    attribute: '室内',
                    scenario: "",
                    address: this.yard_detail_address,
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
                // this.get('logger').log('Error');
                yard = this.get('pmController').get('Store').createModel('request', {
                    id: this.guid(),
                    res: "BmYard",
                });
                yard.get('eqcond').pushObject(this.get('pmController').get('Store').createModel('eqcond', {
                    id: this.guid(),
                    type: 'eqcond',
                    key: 'id',
                    val: this.model.yard.get('id'),
                    category: "BmYard",
                }));

                yard.get('upcond').pushObject(this.get('pmController').get('Store').createModel('upcond', {
                    id: this.guid(),
                    type: 'upcond',
                    key: 'scenario',
                    val: '购物中zz牛',
                    category: "BmYard",
                }));
                yard.get('upcond').pushObject(this.get('pmController').get('Store').createModel('upcond', {
                    id: this.guid(),
                    type: 'upcond',
                    key: 'description',
                    val: this.yard_des,
                    category: "BmYard",
                }));
                let json = this.get('pmController').get('Store').object2JsonApi(yard);
                this.get('logger').log(json)
                this.get('pmController').get('Store').transaction('/api/v1/updateyard/0', 'request', json)
                  .then(data => {
                      this.get('logger').log(data)
                      yard.set('title', this.yard_title);
                  })
                  .catch(data => {
                      this.get('logger').log(data)
                      this.transitionToRoute('home')
                  })

            }

            //TODO: 其他一些属性的修改
            yard.set('title', this.yard_title);
            yard.set('description', this.yard_des);
            yard.set('ardes', this.yard_ardes);
            yard.set('around', this.yard_around);
            yard.set('parking', this.yard_parking);
            yard.set('embag', this.yard_embag);
            yard.set('detail_address', this.yard_detail_address);
            let region = yard.region;
            if (this.yard_selected_province) region.set('province', this.yard_selected_province);
            if (this.yard_selected_city) region.set('city', this.yard_selected_city);
            if (this.yard_selected_government_areas) region.set('governmentArea', this.yard_selected_government_areas);


            // TODO: 其他一些属性的修改

            if (this.isPushing) {
                this.transitionToRoute('yard');
            } else {
                this.transitionToRoute('detail.yard',this.model.yard.get('id'));
            }
        },
        // changeProvinces(value) {
        //     let province = this.store.peekRecord('bmprovinces', value);
        //     this.set('yard_selected_province', province);
        //     // let region = this.model.yard.region;
        //     // region.set('province', province);
        // },
        // changeCitys(value) {
        //     let city = this.store.peekRecord('bmcitys', value);
        //     this.set('yard_selected_city', city);
        //     // let region = this.model.yard.region;
        //     // region.set('city', city);
        // },
        // changeGovernmentAreas(value) {
        //     let area = this.store.peekRecord('bmgovernment-areas', value);
        //     this.set('yard_selected_government_areas', area);
        //     // let region = this.model.yard.region;
        //     // region.set('governmentArea', area);
        // }
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
