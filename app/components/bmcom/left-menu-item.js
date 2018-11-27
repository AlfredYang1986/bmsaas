import Component from '@ember/component';

export default Component.extend({
    collapsed: false,
    manageClick: false,
    teachClick: false,
    workClick: false,
    expClick: false,
    expands: false,
    isInbox: false,
    isSpace: false,
    isDeActive: false,
    isActive: false,
    positionalParams: ['icon', 'title', 'expendable'],
    actions: {
        toggle2() {
            this.sendAction('toggle2');
            if(this.get('title') == "工作台") {
                if(this.workClick) {
                    this.set('workClick', false);
                    this.set('expendable',true);
                    this.set('expands',false);
                } else {
                    this.set('workClick', true);
                    this.set('expendable',false);
                    this.set('expands',true);
                }
            } else if(this.get('title') == "体验活动") {
                if(this.expClick) {
                    this.set('expClick', false);
                    this.set('expendable',true);
                    this.set('expands',false);
                } else {
                    this.set('expClick', true);
                    this.set('expendable',false);
                    this.set('expands',true);
                }
            } else if (this.get('title') == "管理中心") {
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