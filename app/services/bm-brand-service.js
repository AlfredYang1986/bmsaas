import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
    store: service(),
    bmstore: new JsonApiDataStore(),

    init() {
        this._super(...arguments);
        this.addObserver('refresh_token', this, 'queryBrand');
    },

    brandid: '5be6a00b8fb80736e2ec9ba5',
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
        Ember.$.ajax({
            method: 'POST',
            url: '/api/v1/findbrand/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': 'bearer ce6af788112b26331e9789b0b2606cce'
            },
            data: dt,
            success: function(res) {
                let result = that.bmstore.sync(res)
                that.set('brand', result);
            },
            error: function(err) {
                console.log('error is : ', err);
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
        rd_tmp['included'] = arr;
        let dt = JSON.stringify(rd_tmp); 

        Ember.$.ajax({
            method: 'POST',
            url: '/api/v1/pushbrand/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': 'bearer ce6af788112b26331e9789b0b2606cce'
            },
            data: dt,
            success: function(res) {
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
