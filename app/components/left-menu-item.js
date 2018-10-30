import Component from '@ember/component';

export default Component.extend({
    collapsed: false,
    manageClick: false,
    teachClick: false,
    expands: false,
    isInbox: false,
    isSpace: false,
    positionalParams: ['icon', 'title', 'expendable'],
    actions: {
        toggle2() {
            console.log(111)
            this.sendAction('toggle2');
            if (this.get('title') == "管理") {
                if(this.manageClick) {
                    this.set('manageClick', false);
                    this.set('expendable',true);
                    this.set('expands',false);
                } else {
                    this.set('manageClick', true);
                    this.set('expendable',false);
                    this.set('expands',true);
                }
            } else if(this.get('title') == "教学中心") {
                if(this.teachClick) {
                    this.set('teachClick', false);
                    this.set('expendable',true);
                    this.set('expands',false);
                } else {
                    this.set('teachClick', true);
                    this.set('expendable',false);
                    this.set('expands',true);
                }
            }
            if (this.collapsed) this.collapsed = false;
            else this.collapsed = true;
        }
    }

});
