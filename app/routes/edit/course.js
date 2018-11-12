import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
    mock_data: service(),

    model(params) {

        let course = null;
        if(params.courseid != 'course/push') {
            let request = this.get('pmController').get('Store').createModel('request', {
                id: this.guid(),
                res: 'BmSessionInfo',
            });
            let eqd = this.get('pmController').get('Store').createModel('eqcond', {
                id: this.guid(),
                type: 'eqcond',
                key: 'id',
                val: params.courseid
            })
            request.get('eqcond').pushObject(eqd);

            let json = this.get('pmController').get('Store').object2JsonApi(request);

            async function getCourse(that) {
                return await that.get('pmController').get('Store').queryObject('/api/v1/findsessioninfo/0', 'bm-session-info', json)
                    .then(data => {
                        that.get('logger').log(data);
                        return data;
                    })
                    .catch(data => {
                        that.get('logger').log(data);
                    })
            }
            course = getCourse(this)
        }

        return RSVP.hash({
                course : course
            })



        // this.mock_data.sureCourse();
        // let course = this.store.peekRecord('bmcourseinfo', params.courseid);
        // if (course == null && params.courseid != 'course/push') {
        //     this.transitionTo('home');
        // }

        // return RSVP.hash({
        //         course : course
        //     })
    },
    guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },
    setupController(controller, model) {
        this._super(controller, model);
        if (model.course != null) {
            controller.set('crs_title', model.course.get('title'));
            controller.set('crs_subtitle', model.course.get('subtitle'));
            controller.set('crs_alb', model.course.get('alb'));
            controller.set('crs_aub', model.course.get('aub'));
            controller.set('crs_level', model.course.get('level'));
            controller.set('crs_count', model.course.get('count'));
            controller.set('crs_length', model.course.get('length'));
            controller.set('crs_description', model.course.get('description'));
            controller.set('crs_harvest', model.course.get('harvest'));
            controller.set('crs_acquisition', model.course.get('acquisition'));
            controller.set('crs_accompany', model.course.get('accompany'));
            controller.set('crs_including', model.course.get('including'));
            controller.set('crs_carrying', model.course.get('carrying'));
            controller.set('crs_notice', model.course.get('notice'));
            controller.set('crs_cat', model.course.get('Cate').get('title'));
            controller.set('crs_subcat', model.course.get('Cate').get('subtitle'));
            // controller.set('crs_target', model.course.get('target'));
            // controller.set('crs_plan', model.course.get('planning'));
            // controller.set('crs_content', model.course.get('ccontent'));
            // controller.set('crs_imgs', model.course.get('imgs'));
            // controller.set('crs_tags', model.course.get('tags'));

            controller.set('isPushing', false);
        } else {
            controller.set('crs_name', ''),
            controller.set('crs_subtitle', ''),
            controller.set('crs_alb', 0),
            controller.set('crs_aub', 1),
            controller.set('crs_level', ''),
            controller.set('crs_count', ''),
            controller.set('crs_length', 0),
            controller.set('crs_description', ''),
            controller.set('crs_harvest', ''),
            controller.set('crs_acquisition', ''),
            controller.set('crs_accompany', ''),
            controller.set('crs_including', ''),
            controller.set('crs_carrying', ''),
            controller.set('crs_notice', ''),
            controller.set('crs_cat', ''),
            controller.set('crs_subcat', ''),
            // controller.set('crs_target', ''),
            // controller.set('crs_plan', ''),
            // controller.set('crs_content', ''),
            // controller.set('crs_imgs', []),
            // controller.set('crs_tags', []),

            controller.set('isPushing', true);
        }

    },
    activate() {
        if (this.controller) {
            this.controller.set('cur_page_idx', 0);
            this.controller.set('refresh_token', this.controller.guid());
        }
    },
});
