import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    positionalParams: ['left', 'top', 'width', 'height', 'bgColor', 'unit'],
    tagName: 'div',
    classNames: ['bm-time-event', 'bm-time-container-panel', 'bm-content', 'line_container'],
    margin: 3,
    step: 26,
    left: 0,
    display: 'inline-flex',
    top: computed('unit', function(){
        let st = new Date();
        st.setTime(this.unit.startDate);

        let sh = (st.getHours() - 8) * 4;
        let sm = st.getMinutes() / 15;

        if (sh + sm >= 60) {
            this.set('display', 'none');
        }

        return this.step * (sh + sm);
    }),
    height: computed('unit', function(){
        let st = new Date();
        st.setTime(this.unit.startDate);
        let sh = st.getHours();
        let sm = st.getMinutes();

        let et = new Date();
        et.setTime(this.unit.endDate);
        let eh = et.getHours();
        let em = et.getMinutes();

        let tt = (eh - sh) * 4;
        let ee = (em - sm) / 15; 

        return this.step * Math.max((tt + ee), 2) - 2 * this.margin;
    }),
    width: 96,
    bgColor: '#FFB165',
    unit: null,
    attributeBindings: ['style'],
    style: computed('width', 'height', 'margin', 'bgColor', function(){
        return 'left:' + this.left + 'px;' + 
               'top:' + this.top + 'px;' + 
               'width:' + this.width + '%;' + 
               'height:' + this.height + 'px;' + 
               'background:' + this.bgColor + ';' + 
               'margin:' + this.margin + 'px;' + 
               'display:' + this.display;
    }),
    showDetailPanel: false,
    didInsertElement() {
        this.onPanelInserted(this);
    },
    // click() {
    //     this.onPanelClick(this.unit);
    // }

    
    actions: {
        onCloseClick() {
            // this.onCloseClick(unit);
            let cur = document.getElementsByClassName("popover")[0];
            // let cur = document.getElementById(this.unit.id);
            // console.log(cur)
            cur.popover('toggle')
            // document.getElement
        },
        onEditClick(unit) {
            this.onEditClick(unit);
        },
        onDeleteClick(unit) {
            this.onDeleteClick(unit);
        },
    },
});
