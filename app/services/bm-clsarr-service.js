import Service from '@ember/service';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';

export default Service.extend({
    bm_config: service(),
    bmstore: new JsonApiDataStore(),

    init() {
        this._super(...arguments);
        this.addObserver('refresh_all_token', this, 'queryMultiSessionable');
        this.unitSplits();
    },

    yardid: '',
    st: 0,
    et: 0,
    refresh_all_token: '',

    units: A([
        {
            time: 1544839505000,
            title: '今天要开会'
        }
    ]),
    time_uints: A([]),

    queryMultiSessionable() {
        this.bmstore.reset();

        let query_payload = this.genMultiSessionQuery();
        let rd = this.bmstore.sync(query_payload);
        let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));

        let inc = A([]);

        let eq = rd.Eqcond[0].serialize();
        inc.pushObject(eq.data);

        let gt = rd.Gtecond[0].serialize();
        inc.pushObject(gt.data);

        let lt = rd.Ltecond[0].serialize();
        inc.pushObject(lt.data);

        rd_tmp['included'] = inc;
        let dt = JSON.stringify(rd_tmp);

        let that = this;
        Ember.$.ajax({
            method: 'POST',
            url: '/api/v1/findsessionablemultibyyard/0',
            headers: {
                'Content-Type': 'application/json', // 默认值
                'Accept': 'application/json',
                'Authorization': this.bm_config.getToken(),
            },
            data: dt,
            success: function(res) {
                let result = that.bmstore.sync(res);
                // that.set('sessions_in_date', result);
                that.set('time_uints', result);
                that.timeUnitsSplits();
            },
            error: function(err) {
                console.log('error is : ', err);
            },
        })
    },

    genMultiSessionQuery() {
        let eq_guid = this.guid();
        let gt_guid = this.guid();
        let lt_guid = this.guid();
        return {
            data: {
                type: "Request",
                id: this.guid(),
                attributes: {
                    res: "BmSessionable"
                },
                relationships: {
                    Eqcond: {
                        data: [
                            {
                                type: "Eqcond",
                                id: eq_guid
                            }
                        ]
                    },
                    Gtecond: {
                        data: [
                            {
                                type: "Gtecond",
                                id: gt_guid
                            }
                        ]
                    },
                    Ltecond: {
                        data: [
                            {
                                type: "Ltecond",
                                id: lt_guid
                            }
                        ]
                    }
                }
            },
            included: [
                {
                    type: "Eqcond",
                    id: eq_guid,
                    attributes: {
                        key: "id",
                        val: this.yardid,
                        category: "BmYard"
                    }
                },
                {
                    type: "Gtecond",
                    id: gt_guid,
                    attributes: {
                        key: "start_date",
                        val: 1544596294873,
                        category: "BmSessionable"
                    }
                },
                {
                    type: "Ltecond",
                    id: lt_guid,
                    attributes: {
                        key: "end_date",
                        val: 1544626635292,
                        category: "BmSessionable"
                    }
                }
            ]
        }
    },
    guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },

    unitSplits() {
        function filterByMon(units) {
            let tmp = new Date();
            tmp.setTime(units.time);
            return tmp.getDay() == 1;
        }
        function filterByTus(units) {
            let tmp = new Date();
            tmp.setTime(units.time);
            return tmp.getDay() == 2;
        }
        function filterByWed(units) {
            let tmp = new Date();
            tmp.setTime(units.time);
            return tmp.getDay() == 3;
        }
        function filterByThu(units) {
            let tmp = new Date();
            tmp.setTime(units.time);
            return tmp.getDay() == 4;
        }
        function filterByFri(units) {
            let tmp = new Date();
            tmp.setTime(units.time);
            return tmp.getDay() == 5;
        }
        function filterBySat(units) {
            let tmp = new Date();
            tmp.setTime(units.time);
            return tmp.getDay() == 6;
        }
        function filterBySun(units) {
            let tmp = new Date();
            tmp.setTime(units.time);
            return tmp.getDay() == 0;
        }
        // let tmp = this.bm_clsarr_service.get('units');
        this.set('mon_unit_lst', this.get('units').filter(filterByMon))
        this.set('tus_unit_lst', this.get('units').filter(filterByTus))
        this.set('wed_unit_lst', this.get('units').filter(filterByWed))
        this.set('thu_unit_lst', this.get('units').filter(filterByThu))
        this.set('fri_unit_lst', this.get('units').filter(filterByFri))
        this.set('sat_unit_lst', this.get('units').filter(filterBySat))
        this.set('sun_unit_lst', this.get('units').filter(filterBySun))
    },
    timeUnitsSplits() {
        function filterByMon(units) {
            let tmp = new Date();
            tmp.setTime(units.start_date);
            return tmp.getDay() == 1;
        }
        function filterByTus(units) {
            let tmp = new Date();
            tmp.setTime(units.start_date);
            return tmp.getDay() == 2;
        }
        function filterByWed(units) {
            let tmp = new Date();
            tmp.setTime(units.start_date);
            return tmp.getDay() == 3;
        }
        function filterByThu(units) {
            let tmp = new Date();
            tmp.setTime(units.start_date);
            return tmp.getDay() == 4;
        }
        function filterByFri(units) {
            let tmp = new Date();
            tmp.setTime(units.start_date);
            return tmp.getDay() == 5;
        }
        function filterBySat(units) {
            let tmp = new Date();
            tmp.setTime(units.start_date);
            return tmp.getDay() == 6;
        }
        function filterBySun(units) {
            let tmp = new Date();
            tmp.setTime(units.start_date);
            return tmp.getDay() == 0;
        }

        // let tmp = this.bm_clsarr_service.get('time_uints');
        this.set('mon_lst', this.get('time_uints').filter(filterByMon))
        this.set('tus_lst', this.get('time_uints').filter(filterByTus))
        this.set('wed_lst', this.get('time_uints').filter(filterByWed))
        this.set('thu_lst', this.get('time_uints').filter(filterByThu))
        this.set('fri_lst', this.get('time_uints').filter(filterByFri))
        this.set('sat_lst', this.get('time_uints').filter(filterBySat))
        this.set('sun_lst', this.get('time_uints').filter(filterBySun))
    },
});
