import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
    store: service(),
    bm_config: service(),
    bmstore: new JsonApiDataStore(),
    bmmulti: new JsonApiDataStore(),

    account: '',
    secretword: '',
    brandId: '',

    guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },
    genIdQuery() {
        let eq1 = this.guid();
        let eq2 = this.guid();
        // let eq3 = this.guid();
        return {
            data: {
                id: this.guid(),
                type: "Request",
                attributes: {
                    res: "BmAccount"
                },
                relationships: {
                    Eqcond: {
                        data: [
                        {
                            id: eq1,
                            type: "Eqcond"
                        },
                        {
                            id: eq2,
                            type: 'Eqcond'
                        }
                        ]
                    }
                }
            },
            included: [
                {
                    id: eq1,
                    type: "Eqcond",
                    attributes: {
                        key: "account",
                        val: this.account
                    }
                },
                {
                    id: eq2,
                    type: "Eqcond",
                    attributes: {
                        key: 'secretword',
                        val: this.secretword,
                    }
                }
            ]
        }
    },
    accountLogin(callback) {
        this.bmstore.reset();

        let query_yard_payload = this.genIdQuery();
        let rd = this.bmstore.sync(query_yard_payload);
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
        let acc = rd.Eqcond[0].serialize();
        let pass = rd.Eqcond[1].serialize();
        rd_tmp['included'] = [acc.data];
        rd_tmp.included.push(pass.data)
        let dt = JSON.stringify(rd_tmp);

        let that = this
        Ember.$.ajax({
            method: 'POST',
            url: '/api/v1/accountlogin/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': this.bm_config.getToken(),
            },
            data: dt,
            success: function(res) {
                that.bmstore.reset();
                that.set('stud', null);
                let result = that.bmstore.sync(res)
                that.set('result', result)
                callback.onSuccess(res);
            },
            error: function(err) {
                console.log(err);
                callback.onFail(res);
            },
        })
    }
});
