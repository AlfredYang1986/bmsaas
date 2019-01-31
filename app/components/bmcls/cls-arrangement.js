import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
    store: service(),
    bm_clsarr_service: service(),
    selectedRoom: '',
    showAddDlg: false,
    refreshSelected: computed(function(){
        this.refresh_date();
        return '';
    }),

    // yards: computed(function(){
    //     return this.store.findAll('yard');
    // }),

    rooms: computed(function(){
        return this.store.query('room', { "brand-id": localStorage.getItem("brandid")});
    }),

    init() {
        this._super(...arguments);
        this.start_date = this.initStartDate();
        this.end_date = this.computedEndDate();
    },
    initStartDate() {
        let tmp = new Date();
        tmp.setHours(0);
        tmp.setMinutes(0);
        this.current_date = tmp.getTime();
        while (tmp.getDay() != 1) {
            tmp.setDate(tmp.getDate() - 1)
        }
        return tmp.getTime();
    },
    computedEndDate() {
        let tmp = new Date();
        let span = this.start_date + 6 * 24 * 60 * 60 * 1000;
        tmp.setTime(span);
        return tmp.getTime();
    },
    refresh_date() {
        var sel = document.getElementById("roomselect");
        this.set('selectedRoom', sel.options[sel.selectedIndex].value);
        this.bm_clsarr_service.set('roomid', this.selectedRoom);
        this.bm_clsarr_service.set('st', this.start_date);
        this.bm_clsarr_service.set('et', this.end_date);
        this.bm_clsarr_service.set('refresh_all_token', this.bm_clsarr_service.guid());
        // this.store.query("unit",{ "room-id": this.selectedRoom}).then(res => {
        //     this.bm_clsarr_service.set('units', res);
        //     console.log(res)
        // },() => {
        //     window.console.log("query units error")
        // })
    },
    actions: {
        prevBtnClicked(/*args*/) {
            let tmp = new Date();
            let span = this.start_date - 7 * 24 * 60 * 60 * 1000;
            tmp.setTime(span);
            this.set('start_date', tmp.getTime());
            this.set('end_date', this.computedEndDate());
            this.refresh_date();
        },
        nextBtnClicked(/*args*/) {
            let tmp = new Date();
            let span = this.start_date + 7 * 24 * 60 * 60 * 1000;
            tmp.setTime(span);
            this.set('start_date', tmp.getTime());
            this.set('end_date', this.computedEndDate());
            this.refresh_date();
        },
        todayBtnClicked(/*args*/) {

        },
        roomChanged() {
            this.refresh_date();
        },
        cancelHandled() {
            this.set('showAddDlg', false);
        },
        successHandled() {
            this.set('showAddDlg', false);
        },
        addUnitOnClick() {
            this.onAddUnitClick()
        },
        onPanelClick(param) {
            this.onPanelClick(param);
        },
    }
});
