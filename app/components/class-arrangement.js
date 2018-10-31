import Component from '@ember/component';
import { A } from '@ember/array';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
    mock_data: service(),
    store: service(),
    positionalParams: ['xmargin', 'ymargin', 'yardid'],
    time_line_margin: 10,
    time_line_width: computed(function(){
        var canvas = document.getElementById('arrangement');
        var ctx = canvas.getContext('2d');
        ctx.font = '14px PingFangSC-Regular';
        return ctx.measureText('88:88').width;
    }),
    time_span_width: computed(function(){
        var canvas = document.getElementById('arrangement');
        var ctx = canvas.getContext('2d');
        ctx.font = '14px PingFangSC-Regular';
        return ctx.measureText('88 周周').width;
    }),
    time_span_height: 38,
    total_width: computed(function(){
        var canvas = document.getElementById('arrangement');
        return canvas.clientWidth;
    }),
    total_height: computed(function(){
        var canvas = document.getElementById('arrangement');
        return canvas.clientHeight;
    }),
    tb_width: computed('total_width', 'xmargin', function(){
        return this.total_width - 2 * this.xmargin - this.time_line_width;
    }),
    tb_height: computed('total_height', 'ymargin', function(){
        return this.total_height - 2 * this.ymargin - this.time_span_height;
    }),

    end_date: computed('start_date', function(){
        let tmp = new Date();
        let span = this.start_date.getTime() + 7 * 24 * 60 * 60 * 1000;
        tmp.setTime(span);
        return tmp;
    }),
    start_month: computed('start_date', function(){
        return this.start_date.getMonth() + 1;
    }),
    start_day: computed('start_date', function(){
        return this.start_date.getDate();
    }),
    end_month: computed('end_date', function(){
        return this.end_date.getMonth() + 1;
    }),
    end_day: computed('end_date', function(){
        return this.end_date.getDate() - 1;
    }),
    timeLine: A([
        '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
        '16:00', '17:00', '18:00', '19:00', '20:00'
    ]),

    init() {
        this._super(...arguments);
        this.start_date = this.initStartDate();
    },
    didRender() {
        console.log('data did render');
        var canvas = document.getElementById('arrangement');
        var ctx = canvas.getContext('2d');

        this.cleanCanves(ctx);
        this.drawTimeLine(ctx);
        this.drawDayLine(ctx);
        this.drawWeekDate(ctx);
        this.drawSessions(ctx);
    },
    cleanCanves(ctx) {
        ctx.clearRect(0, 0, this.total_width, this.total_height);
    },
    drawTimeLine(ctx) {
        let line_height_step = this.tb_height / 12.0;

        ctx.font = '14px PingFangSC-Regular';
        
        for (let idx = 0; idx < this.timeLine.length; idx++) {
            let y = this.time_line_margin + this.time_span_height + line_height_step * idx;
            ctx.fillStyle = '#AAAAAA';
            ctx.fillText(this.timeLine[idx], this.time_line_margin, y);

            ctx.fillStyle = "#979797";
            ctx.fillRect(this.xmargin + this.time_line_width + this.time_line_margin, y - 7, this.tb_width, 1);
        }
    },
    drawDayLine(ctx) {
        let x_str = this.xmargin + this.time_line_margin + this.time_line_width - 1;
        let y = this.time_span_height + 3;
        let step_width = this.tb_width / 7.0;
        for (let idx = 0; idx <= 8; idx++) {
            let x = x_str + step_width * idx;
            ctx.fillStyle = "#979797";
            ctx.fillRect(x, y, 1, this.tb_height);
        }
    },
    drawWeekDate(ctx) {
        let x = 60;
        let y = 25;
        let step_width = this.tb_width / 7.0;
        let x_str = 60 + this.tb_width / 14.0 - 20;
        let weekDay = A([
            '周一', 
            '周二', 
            '周三', 
            '周四', 
            '周五', 
            '周六', 
            '周天', 
        ]);
        let tmp = new Date; 
        tmp.setDate(this.start_date.getDate());

        for (let idx = 0; idx < 7; idx++) {
            ctx.fillStyle = "#AAA";
            x = x_str + step_width * idx;
            ctx.fillText(tmp.getDate() + ' ' +  weekDay[idx], x, y);
            tmp.setDate(tmp.getDate() + 1);
        }
    },

    initStartDate() {
        let tmp = new Date()
        tmp.setHours(0);
        tmp.setMinutes(0);
        while (tmp.getDay() != 1) {
            tmp.setDate(tmp.getDate() - 1)
        }
        return tmp;
    },

    /**
     * start logic
     */
    cur_yard: computed('yardid', function(){
        return this.store.peekRecord('bmyard', this.yardid);
    }),
    cls_on_yard: computed('cur_yard', function(){
        let that = this;
        function filerClsOnYardCondi(cls) {
            return cls.yard.get('id') == that.cur_yard.get('id');
        }
        let all = this.store.peekAll('bmclass');
        return all.filter(filerClsOnYardCondi);
    }),
    sessions_on_cls: computed('cls_on_yard', 'start_date', 'session_refresh_token', function(){
        let lst = A();
        for (let idx = 0; idx < this.cls_on_yard.length; idx++) {
            let tmp = this.cls_on_yard[idx].get('session');
            for (let inner = 0; inner < tmp.length; inner++) {
                lst.pushObject(tmp.objectAt(inner));
            }
        }
        return lst;
    }),
    sessions_on_time: computed('sessions_on_cls', function() {
        let that = this;
        function filerSessionWithTime(ses) {
            let condi = ses.get('start_date');
            let ss = that.get('end_date');
            let ee = that.get('start_date');;
            return condi > ee && condi < ss;
        }
        return this.sessions_on_cls.filter(filerSessionWithTime);
    }),
    drawSessions(ctx) {
        console.log('draw session');

        let s = this.get('start_date');
        let sdd = s.getDay() == 0 ? 7 : s.getDay();
        
        let e = this.get('end_date');
        let edd = e.getDay() == 0 ? 7 : e.getDay();

        let x_str = this.xmargin + this.time_line_margin + this.time_line_width - 1;
        let step_width = this.tb_width / 7.0;

        let line_height_step = this.tb_height / 12.0;

        for (let idx = 0; idx < this.sessions_on_time.length; idx++) {
            let ses = this.sessions_on_time.objectAt(idx);
            let date = ses.get('start_date');

            let dd = date.getDay() == 0 ? 7 : date.getDay();
            let hh = date.getHours() - 8;
            let ll = ses.get('length') / 60;

            ctx.fillStyle = '#F2F6FF';
            let x = x_str + step_width * (dd - 1);
            let y = this.time_line_margin + this.time_span_height + line_height_step * hh - 7;
            ctx.fillRect(x, y, step_width, ll * line_height_step);

            ctx.fillStyle='#80AEFF';
            ctx.fillRect(x, y, 2, ll * line_height_step);

            ctx.font = '14px PingFangSC-Medium';
            ctx.fillStyle = '#171B4D';
            ctx.fillText(ses.cls.get('name'), x + 4, y + 14 + 4);
            ctx.font = '11px PingFangSC-Regular';
            ctx.fillStyle = '#6B778C';
            ctx.fillText('开始时间: ' + (hh + 8) + ':00', x + 4, y + 14 + 14 + 4);
            ctx.fillText('持续时间: ' + ses.get('length') + ' mins', x + 4, y + 14 + 14 + 14 + 4);
        }
    },

    /**
     * insert session dlg logic
     */
    insertdlg: false,
    session_insert_cls: null,
    session_insert_date: '2018-10-01',
    session_insert_hours: 0,
    session_insert_length: 0,
    session_insert_techid_lst: A(),
    session_refresh_token: 'start-token',
   
    session_insert_is_validate: computed('session_insert_cls', 
                                         'session_insert_date', 
                                         'session_insert_hours', 
                                         'session_insert_length',
                                         'session_insert_techid_lst', function(){

        return this.session_insert_cls != null &&
                    this.session_insert_date.length > 0 &&
                    this.session_insert_length > 0 &&
                    this.session_insert_hours > 0 &&
                    this.session_insert_techid_lst.length > 0;
    }),

    actions: {
        leftBtnClicked() {
            let tmp = new Date();
            let span = this.start_date.getTime() - 7 * 24 * 60 * 60 * 1000;
            tmp.setTime(span);
            this.set('start_date', tmp);
        },
        rightBtnClicked() {
            let tmp = new Date();
            let span = this.start_date.getTime() + 7 * 24 * 60 * 60 * 1000;
            tmp.setTime(span);
            this.set('start_date', tmp);
        },
        appendBtnClicked() {
            this.onAddClassBtnClicked();
        },
        cslChanged() {
            let sel = document.getElementById('clsselect');
            if (sel.selectedIndex == 0) {
                this.set('session_insert_cls', null);
            } else {
                let cls_id = sel.options[sel.selectedIndex].value;
                let cls = this.store.peekRecord('bmclass', cls_id);
                this.set('session_insert_cls', cls);
            }
        },
        cancelHandled() {
            this.set('session_insert_techid_lst', A());
            this.set('session_insert_length', 0);
            this.set('session_insert_cls', null);
            this.set('session_insert_hours', 0);
            this.set('insertdlg', false);
        }, 
        successHandled() {

            if (this.session_insert_is_validate) {
                console.log('insert session');
                let nse = this.store.createRecord('bmclssession', {
                    id: this.guid(),
                    length: this.session_insert_length,
                })
                let sd = new Date(this.session_insert_date);
                sd.setHours(this.session_insert_hours);
                nse.set('start_date', sd);

                let tmp = this.session_insert_techid_lst.objectAt(0);
                let tech_lst = this.store.peekRecord('bmtech', tmp);
                nse.set('tech', tech_lst);

                nse.set('cls', this.session_insert_cls);
                // use refresh token to refresh
                this.set('session_refresh_token', this.guid());

            } else {
                alert('something wrong')
            }

            this.set('session_insert_techid_lst', A());
            this.set('session_insert_length', 0);
            this.set('session_insert_cls', null);
            this.set('session_insert_hours', 0);
            this.set('insertdlg', false);
        },
        hourChanged() {
            let sel = document.getElementById('hourselect');
            if (sel.selectedIndex == 0) {
                this.set('session_insert_hours', 0);
            } else {
                let hours = sel.options[sel.selectedIndex].value;
                this.set('session_insert_hours', hours);
            }
        },
        oneTechChecked(techid, checked) {
            if (checked) {
                this.session_insert_techid_lst.pushObject(techid);
            } else {
                this.session_insert_techid_lst.removeObject(techid);
            }
        },
        
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
