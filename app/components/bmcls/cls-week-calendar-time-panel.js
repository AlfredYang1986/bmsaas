import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    positionalParams: ['left', 'top', 'width', 'height', 'bgcolor', 'unit'],
    tagName: 'div',
    classNames: ['bm-time-event', 'bm-time-container-panel', 'bm-content', 'line_container'],
    margin: 3,
    step: 26,
    left: 0,
    top: computed('unit', function(){
        let st = new Date();
        st.setTime(this.unit.start_time);

        let sh = (st.getHours() - 8) * 4;
        let sm = st.getMinutes() / 15;

        return this.step * (sh + sm);
    }),
    height: computed('unit', function(){
        let st = new Date();
        st.setTime(this.unit.start_time);
        let sh = st.getHours();
        let sm = st.getMinutes();

        let et = new Date();
        et.setTime(this.unit.end_time);
        let eh = et.getHours();
        let em = et.getMinutes();

        let tt = (eh - sh) * 4;
        let ee = (em - sm) / 15; 

        return this.step * (tt + ee) - 2 * this.margin;
    }),
    width: 96,
    bgcolor: '#F2F6FF',
    unit: null,
    attributeBindings: ['style'],
    style: computed('width', 'height', 'margin', 'bgcolor', function(){
        return 'left:' + this.left + 'px;' + 
               'top:' + this.top + 'px;' + 
               'width:' + this.width + '%;' + 
               'height:' + this.height + 'px;' + 
               'background:' + this.bgcolor + ';' + 
               'margin:' + this.margin + 'px;';
    }),
    showDetailPanel: false,
    didInsertElement() {
        this.onPanelInserted(this);
    },
    click() {
        console.log('click');
    }
});
