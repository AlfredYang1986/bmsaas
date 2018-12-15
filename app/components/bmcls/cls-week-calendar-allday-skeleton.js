import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Component.extend({

    bm_clsarr_service: service(),
    
    positionalParams: ['start_date', 'end_date'],
    tagName: 'div',
    classNames: ['bm-scoller', 'bm-time-grid-container', 'bm-skeleton'],
    attributeBindings: ['style'],
    height: 38,
    margin: 14,
    style: computed('overflow', 'height', 'margin', function(){
        return 'height: ' + this.height + 'px;' + 'margin-right:' + this.margin + 'px'; 
    }),

    mon_lst: A([]),
    tus_lst: A([]),
    wed_lst: A([]),
    thu_lst: A([]),
    fri_lst: A([]),
    sat_lst: A([]),
    sun_lst: A([]),

    actions: {
        panelInserted() {
            let tmp = this.height;
            let rows = this.bm_clsarr_service.units.length; // TODO: 七天里面最多的一天
            tmp = rows * (30 + 3) + 3 + 1;
            this.set('height', tmp);
        }
    },
    willRender() {
        function filterByMon(units) {
            let tmp = new Date();
            tmp.setTime(units.time);
            return tmp.getDay() == 1;
            // return units.time.getDay() == 1;
        }
        function filterByTus(units) {
            let tmp = new Date();
            tmp.setTime(units.time);
            return tmp.getDay() == 2;
            // return units.time.getDay() == 2;
        }
        function filterByWed(units) {
            let tmp = new Date();
            tmp.setTime(units.time);
            return tmp.getDay() == 3;
            // return units.time.getDay() == 3;
        }
        function filterByThu(units) {
            let tmp = new Date();
            tmp.setTime(units.time);
            return tmp.getDay() == 4;
            // return units.time.getDay() == 4;
        }
        function filterByFri(units) {
            let tmp = new Date();
            tmp.setTime(units.time);
            return tmp.getDay() == 5;
            // return units.time.getDay() == 5;
        }
        function filterBySat(units) {
            let tmp = new Date();
            tmp.setTime(units.time);
            return tmp.getDay() == 6;
            // return units.time.getDay() == 6;
        }
        function filterBySun(units) {
            let tmp = new Date();
            tmp.setTime(units.time);
            return tmp.getDay() == 0;
            // return units.time.getDay() == 0;
        }
        let tmp = this.bm_clsarr_service.get('units');
        this.set('mon_lst', this.bm_clsarr_service.get('units').filter(filterByMon))
        this.set('tus_lst', this.bm_clsarr_service.get('units').filter(filterByTus))
        this.set('wed_lst', this.bm_clsarr_service.get('units').filter(filterByWed))
        this.set('thu_lst', this.bm_clsarr_service.get('units').filter(filterByThu))
        this.set('fri_lst', this.bm_clsarr_service.get('units').filter(filterByFri))
        this.set('sat_lst', this.bm_clsarr_service.get('units').filter(filterBySat))
        this.set('sun_lst', this.bm_clsarr_service.get('units').filter(filterBySun))
    },
});
