import Component from '@ember/component';

export default Component.extend({
    positionalParams: ['data'],
    tagName: '',
    main: ['科学', '运动', '自然', '人际关系',],
    sub: [],

    actions: {
        changeMain(value) {
            if(value == '科学'){
                this.set('sub',['STEM','简易物理']);
            }else if(value == '运动'){
                this.set('sub',['羽毛球','足球']);
            }else if(value == '自然'){
                this.set('sub',['蚂蚁生态','生态圈']);
            }else if(value == '人际关系'){
                this.set('sub',['简易','进阶']);
            }
        },
        changeSub(value) {
            this.set('data', value)
        },
    }
});
