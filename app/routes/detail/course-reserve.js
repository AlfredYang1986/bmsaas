import Route from '@ember/routing/route';

export default Route.extend({
    model() {
        return [{
            title:"状态"
        },{
            title:"时间"
        },{
            title:"地点"
        },{
            title:"孩子姓名"
        },{
            title:"联系方式"
        },{
            title:"操作"
        }]
    }
});
