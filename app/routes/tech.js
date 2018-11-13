import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model() {
        // this.store.unloadAll('bm-teacher');

        let request = this.get('pmController').get('Store').createModel('request', {
            id: this.guid(),
            res: 'BmTeacher',
            fmcond: this.get('pmController').get('Store').createModel('fmcond', {
                id: this.guid(),
                skip: 0,
                take: 0
            }),
            // eqcond: this.get('pmController').get('Store').createModel('eqcond', {
            //     id: this.guid(),
            //     Ky: "brandId",
            //     Vy: "fackid"
            // })
        });
        let json = this.get('pmController').get('Store').object2JsonApi(request);

        let techs = this.get('pmController').get('Store').queryMultipleObject('/api/v1/findteachermulti/0', 'bm-teacher', json)
            .then(data => {
                this.get('logger').log(data);
                return data;
            })
            .catch(data => {
                this.get('logger').log(data);
            })

        return RSVP.hash({
                techs: techs
            })
    },
    guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },
});
