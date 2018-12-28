import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { debug } from '@ember/debug';

export default Service.extend({
    bm_config: service(),
    
    init() {
        this._super(...arguments);
        this.set('bmstore', new JsonApiDataStore());
        this.set('bmmulti', new JsonApiDataStore());
        // this.addObserver('refresh_token', this, 'querySessionable');
        this.addObserver('refresh_all_token', this, 'queryMultiObjects');
    },

    refresh_token: '',
    refresh_all_token: '',

    page: 0,
    steps: 10,

    sessionableid: '',
    sessionables: A([]),
    
    guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },

    genMultiQuery() {
        let eq = this.guid();
        let fm = this.guid();
        return {
                data: {
                    id: this.guid(),
                    type: "Request",
                    attributes: {
                        res: "BmSessionable"
                    },
                    relationships: {
                        Fmcond: {
                            data:
                            {
                                id: fm,
                                type: "Fmcond"
                            }
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
                ]
            }
    },

    queryMultiObjects() {
        this.bmmulti.reset();

        let query_yard_payload = this.genMultiQuery();
        let rd = this.bmmulti.sync(query_yard_payload);
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
        // let inc = rd.Eqcond[0].serialize();
        let fm = rd.Fmcond.serialize();
        rd_tmp['included'] = [fm.data];
        let dt = JSON.stringify(rd_tmp);

        let that = this
        $.ajax({
            method: 'POST',
            url: '/api/v1/findsessionablemulti/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': 'bearer ' + this.get('cookie').read('token'),
            },
            data: dt,
            success: function(res) {
                let result = that.bmmulti.sync(res)
                if(result !== undefined){
                    for(let idx = 0;idx < result.length;idx++){
                        result[idx].tmp_date = result[idx].start_date;
                    }
                }
                that.set('sessionables', result);
            },
            error: function(err) {
                debug('error is : ', err);
            },
        })
    },
});
