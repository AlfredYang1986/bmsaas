import Component from '@ember/component';

export default Component.extend({
    positionalParams: ['icon', 'title', 'expendable', 'pageUrl', ],

    expands: false,
    collapsed: false,

    manageClick: false,
    teachClick: false,
    expClick: false,


    actions: {
        toggle2() {
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
            } else if(this.get('title') == "营销管理") {
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
