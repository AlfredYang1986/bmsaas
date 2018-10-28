import Route from '@ember/routing/route';

export default Route.extend({
    model() {
        return [{
            title:"状态"
        },{
            title:"孩子姓名"
        },{
            title:"生日"
        },{
            title:"性别"
        },{
            title:"联系方式"
        },{
            title:"渠道"
        },{
            title:"操作"
        }]
    }
});
