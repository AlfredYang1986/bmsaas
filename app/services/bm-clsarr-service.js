import Service from '@ember/service';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Service.extend({
    store: service(),
    bm_config: service(),

    init() {
        this._super(...arguments);
        this.addObserver('refresh_all_token', this, 'resetTimeUnits');
        this.unitSplits();
        this.set("st", this.initStartDate());
        this.set("et", this.computedEndDate());
    },

    roomid: '',
    st: 0,
    et: 0,
    refresh_all_token: '',

    units: A([
        {
            time: 1544839505000,
            title: '今天要开会'
        }
    ]),

    guid() {
        function S4() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        }
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    },

    initStartDate() {
        let tmp = new Date();
        tmp.setHours(0);
        tmp.setMinutes(0);
        this.current_date = tmp.getTime();
        while (tmp.getDay() != 1) {
            tmp.setDate(tmp.getDate() - 1)
        }
        tmp.setSeconds(0)
        tmp.setMilliseconds(0)
        return tmp.getTime();
    },
    computedEndDate() {
        let tmp = new Date();
        let span = this.start_date + 7 * 24 * 60 * 60 * 1000;
        tmp.setTime(span);
        tmp.setSeconds(0)
        tmp.setMilliseconds(0)
        return tmp.getTime();
    },

    resetTimeUnits() {
        let that = this;
        this.store.query('unit', {"room-id": this.roomid, 'gte[start-date]': this.st, 'lt[end-date]': this.et}).then(res => {
            return new Promise(function(resolve, reject){
                that.timeUnitsSplits(res)
                resolve(res)
            })
        })
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
    timeUnitsSplits(tmp) {
        function filterByMon(units) {
            let tmp = new Date();
            tmp.setTime(units.startDate);
            return tmp.getDay() == 1;
        }
        function filterByTus(units) {
            let tmp = new Date();
            tmp.setTime(units.startDate);
            return tmp.getDay() == 2;
        }
        function filterByWed(units) {
            let tmp = new Date();
            tmp.setTime(units.startDate);
            return tmp.getDay() == 3;
        }
        function filterByThu(units) {
            let tmp = new Date();
            tmp.setTime(units.startDate);
            return tmp.getDay() == 4;
        } 
        function filterByFri(units) {
            let tmp = new Date();
            tmp.setTime(units.startDate);
            return tmp.getDay() == 5;
        }
        function filterBySat(units) {
            let tmp = new Date();
            tmp.setTime(units.startDate);
            return tmp.getDay() == 6;
        }
        function filterBySun(units) {
            let tmp = new Date();
            tmp.setTime(units.startDate);
            return tmp.getDay() == 0;
        }

        // let tmp = this.get('time_uints');
        if (tmp) {
            this.set('mon_lst', tmp.filter(filterByMon))
            this.set('tus_lst', tmp.filter(filterByTus))
            this.set('wed_lst', tmp.filter(filterByWed))
            this.set('thu_lst', tmp.filter(filterByThu))
            this.set('fri_lst', tmp.filter(filterByFri))
            this.set('sat_lst', tmp.filter(filterBySat))
            this.set('sun_lst', tmp.filter(filterBySun))

        } else {
            this.set('mon_lst', A([]))
            this.set('tus_lst', A([]))
            this.set('wed_lst', A([]))
            this.set('thu_lst', A([]))
            this.set('fri_lst', A([]))
            this.set('sat_lst', A([]))
            this.set('sun_lst', A([]))
        }
    },
});
