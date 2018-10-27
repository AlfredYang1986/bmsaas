import Route from '@ember/routing/route';

export default Route.extend({
    model() {
        return [{
            title:"场次号"
        },{
            title:"时间段"
        },{
            title:"场地"
        },{
            title:"报名人数"
        },{
            title:"报名状态"
        },{
            title:"操作"
        }]
    }
});
