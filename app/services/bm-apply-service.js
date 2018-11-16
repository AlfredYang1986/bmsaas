import Service from '@ember/service';
import { A } from '@ember/array';

export default Service.extend({
    bmstore: new JsonApiDataStore(),
    bmmulti: new JsonApiDataStore(),
    
    init() {
        this._super(...arguments);
        this.addObserver('refresh_token', this, 'queryApplyInfo');
        this.addObserver('refresh_all_token', this, 'queryMultiObjects');
    },

    page: 0,
    steps: 20,
    applyid: '',
    refresh_token: '',
    refresh_all_token: '',
    apply: '',
    applies: A([]),

    queryApplyInfo() {
        this.bmstore.reset();
        this.set('apply', null);

        if (this.applyid.length == 0) {
            return;
        }

        let query_app_payload = this.genIdQuery();
        let rd = this.bmstore.sync(query_app_payload);
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
        let eq = rd.Eqcond[0].serialize();
        // let fm = rd.Fmcond[0].serialize();
        rd_tmp['included'] = [eq.data];
        let dt = JSON.stringify(rd_tmp);

        let that = this;
        Ember.$.ajax({
            method: 'POST',
            url: '/api/v1/findapply/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': 'bearer ce6af788112b26331e9789b0b2606cce'
            },
            data: dt,
            success: function(res) {
                let result = that.bmstore.sync(res)
                that.set('apply', result);
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
                        res: "BmApply"
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
                            val: this.applyid
                        }
                    },
                   
                ]
            }
    },

    genMultiQuery() {
        let fm = this.guid();
        let eq = this.guid();
        return {
                data: {
                    id: this.guid(),
                    type: "Request",
                    attributes: {
                        res: "BmApply"
                    },
                    relationships: {
                        Fmcond: {
                            data: {
                                id: fm,
                                type: "Fmcond",
                            }
                        },
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
                        id: fm,
                        type: "Fmcond",
                        attributes: {
                            take: this.steps,
                            page: this.page
                        }
                    },
                    {
                        id: eq,
                        type: "Eqcond",
                        attributes: {
                            key: "brandId",
                            val: "5be6a00b8fb80736e2ec9ba5"
                        }
                    }
                ]
            } 
    },

    queryMultiObjects() {
        this.bmmulti.reset();

        let query_yard_payload = this.genMultiQuery();
        let rd = this.bmmulti.sync(query_yard_payload);
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
        let eq = rd.Eqcond[0].serialize();
        let fm = rd.Fmcond.serialize();
        rd_tmp['included'] = [eq.data, fm.data];
        let dt = JSON.stringify(rd_tmp);

        let that = this
        Ember.$.ajax({
            method: 'POST',
            url: '/api/v1/findapplies/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': 'bearer ce6af788112b26331e9789b0b2606cce'
            },
            data: dt,
            success: function(res) {
                let result = that.bmmulti.sync(res)
                that.set('applies', result);
            },
            error: function(err) {
                console.log('error is : ', err);
            },
        })
    },

    saveUpdate(callback) {

        if (!this.isValidate) {
            return ;
        }

        let ft = this.apply;
        let rd = ft.Applyee;

        let arr = [];
        for (let idx = 0; idx < ft.kids.length; idx++) {
            let tmp = rd.kids[idx].serialize();
            arr.push(tmp.data);
        }

        let c = rd.serialize();
        arr.push(c.data);

        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
        arr.push(rd_tmp.data)

        let ft_tmp = JSON.parse(JSON.stringify(ft.serialize()));
        ft_tmp['included'] = arr;
        let dt = JSON.stringify(ft_tmp); 

        Ember.$.ajax({
            method: 'POST',
            url: '/api/v1/pushapply/0',
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
        return this.apply.id.length > 0;
    }
});
