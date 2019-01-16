import Service from '@ember/service';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import { debug } from '@ember/debug';

export default Service.extend({
    store: service(),
    bm_config: service(),

    init() {
        this._super(...arguments);
        this.addObserver('refresh_token', this, 'queryBrand');
        this.set('bmstore', new JsonApiDataStore());
        // this.set('bmmulti', new JsonApiDataStore());
    },

    brandid: localStorage.getItem('brandid'),
    refresh_token: '',
    brand: null,

    queryBrand() {
        this.bmstore.reset();
        this.set('brand', null);

        if (this.brandid.length == 0) {
            return;
        }

        let query_yard_payload = this.genIdQuery();
        let rd = this.bmstore.sync(query_yard_payload);
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
        let inc = rd.Eqcond[0].serialize();
        rd_tmp['included'] = [inc.data];
        let dt = JSON.stringify(rd_tmp);

        let that = this
        $.ajax({
            method: 'POST',
            url: '/api/v1/findbrand/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': 'bearer ' + this.get('cookie').read('token')
            },
            data: dt,
            success: function(res) {
                let result = that.bmstore.sync(res);
                // sessionStorage.setItem("brandLogo", result.logo);
                
                let tempArr = [];
                if(result.brand_tags != null) {
                    for (let idx = 0;idx < result.brand_tags.length;idx++) {
                        let item = {};
                        item.id = idx + 1;
                        item.text = result.brand_tags[idx];
                        tempArr.push(item);
                    }
                }
                result.brand_tags = tempArr;

                that.set('brand', result);
            },
            error: function(err) {
                debug('error is : ', err);
            },
        })

    },
    guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },

    genNewImgObj(type) {
        let payload = this.genNewImgPayload(type);
        let result = this.bmstore.sync(payload);
        return result;
    },
    
    genNewImgPayload(type) {
        return {
            data: {
                type: type,
                id: this.guid(),
                attributes: {
                    img: "",
                    tag: ""
                },
            }
        }
    },

    genIdQuery() {
        let eq = this.guid();
        return {
                data: {
                    id: this.guid(),
                    type: "Request",
                    attributes: {
                        res: "BmBrand"
                    },
                    relationships: {
                        Eqcond: {
                            data: [
                            {
                                id: eq,
                                type: "Eqcond"
                            }
                            ]
                        }
                    }
                },
                included: [
                    {
                        id: eq,
                        type: "Eqcond",
                        attributes: {
                            key: "id",
                            val: this.brandid
                        }
                    }
                ]
            }
    },
    saveUpdate(callback) {

        if (!this.isValidate) {
            return ;
        }

        let rd = this.brand;
        
        let arr = [];
        for (let idx = 0; idx < rd.Honors.length; idx++) {
            let tmp = rd.Honors[idx].serialize();
            arr.push(tmp.data);
        }
        
        for (let idx = 0; idx < rd.Certifications.length; idx++) {
            let tmp = rd.Certifications[idx].serialize();
            arr.push(tmp.data);
        }
        
        let c = rd.Cate.serialize();
        arr.push(c.data);
        
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));

        let tempArr = [];
        for (let idx = 0;idx < rd_tmp.data.attributes.brand_tags.length;idx++) {
            tempArr.push(rd_tmp.data.attributes.brand_tags[idx].text);
        }
        rd_tmp.data.attributes.brand_tags = tempArr;

        rd_tmp['included'] = arr;
        let dt = JSON.stringify(rd_tmp);

        $.ajax({
            method: 'POST',
            url: '/api/v1/pushbrand/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': 'bearer ' + this.get('cookie').read('token'),
            },
            data: dt,
            success: function(/*res*/) {
                callback.onSuccess();
            },
            error: function(err) {
                callback.onFail(err);
            },
        })
    },
    isValidate() {
        return this.brand.title.length > 0;
    }
});
