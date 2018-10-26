import Component from '@ember/component';
import { A } from '@ember/array';
import { computed } from '@ember/object';

export default Component.extend({
    positionalParams: ['xmargin', 'ymargin'],
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
        let tmp = new Date()
        tmp.setDate(this.start_date.getDate() + 6);
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
        return this.end_date.getDate();
    }),
    timeLine: A([
        '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
        '16:00', '17:00', '18:00', '19:00', '20:00'
    ]),

    init() {
        this._super(...arguments);
        this.start_date = this.initStartDate();
    },
    didUpdate() {

    },
    didRender() {
        var canvas = document.getElementById('arrangement');
        var ctx = canvas.getContext('2d');

        this.cleanCanves(ctx);
        this.drawTimeLine(ctx);
        this.drawDayLine(ctx);
        this.drawWeekDate(ctx);
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
    // click(event) {
    //     console.log('click');
    //     console.log(event.offsetX);
    //     console.log(event.offsetY);
    // },

    actions: {
        leftBtnClicked() {
            let tmp = new Date();
            tmp.setDate(this.start_date.getDate() - 7);
            this.set('start_date', tmp);
        },
        rightBtnClicked() {
            let tmp = new Date();
            tmp.setDate(this.start_date.getDate() + 7);
            this.set('start_date', tmp);
        },
        appendBtnClicked() {
            this.onAddClassBtnClicked();
        }
    },

    initStartDate() {
        let tmp = new Date()
        while (tmp.getDay() != 1) {
            tmp.setDate(tmp.getDate() - 1)
        }
        return tmp;
    }
});
