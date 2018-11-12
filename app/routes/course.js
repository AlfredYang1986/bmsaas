import Route from '@ember/routing/route';
import RSVP from 'rsvp';
// import { computed } from '@ember/object';
// import { inject as service } from '@ember/service';

export default Route.extend({
    // mock_data: service(),
    model() {
        // this.mock_data.sureCourse();
        // let course = this.store.peekAll('bmcourseinfo');
        //
        // return RSVP.hash({
        //         course: course
        //     })
        let request = this.get('pmController').get('Store').createModel('request', {
            id: this.guid(),
            res: 'BmSessionInfo',
            fmcond: this.get('pmController').get('Store').createModel('fmcond', {
                id: this.guid(),
                skip: 0,
                take: 0
            })
        });
        let json = this.get('pmController').get('Store').object2JsonApi(request);
        this.get('logger').log(json);

        let courses =  this.get('pmController').get('Store').queryMultipleObject('/api/v1/findsessioninfomulti/0', 'bm-session-info', json)
            .then(data => {
                this.get('logger').log(data);
                return data;
            })
            .catch(data => {
                this.get('logger').log(data);
            })
            return RSVP.hash({
                courses: courses
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
