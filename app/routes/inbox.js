import Route from '@ember/routing/route';

export default Route.extend({
    model() {
        return [{
            title:"状态"
        },{
            title:"时间"
        },{
            title:"场地"
        },{
            title:"内容标题"
        },{
            title:"孩子"
        },{
            title:"联系方式"
        },{
            title:"操作"
        }]
    }
});
