import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
    mock_data: service(),

    model(params) {
        this.mock_data.sureCourse();
        let course = this.store.peekRecord('bmcourseinfo', params.courseid);
        if (course == null && params.courseid != 'course/push') {
            this.transitionTo('home');
        } 

        return RSVP.hash({
                course : course
            })
    },  

    setupController(controller, model) {
        this._super(controller, model);
        if (model.course != null) {
            controller.set('crs_name', model.course.get('name'));
            controller.set('crs_alb', model.course.get('alb'));
            controller.set('crs_aub', model.course.get('aub'));
            controller.set('crs_level', model.course.get('level'));
            controller.set('crs_length', model.course.get('length'));
            controller.set('crs_cat', model.course.get('category').get('cat'));
            controller.set('crs_subcat', model.course.get('category').get('sub'));
            controller.set('crs_target', model.course.get('target'));
            controller.set('crs_plan', model.course.get('planning'));
            controller.set('crs_content', model.course.get('ccontent'));
            controller.set('crs_imgs', model.course.get('imgs'));
            controller.set('crs_tags', model.course.get('tags'));
            
            controller.set('isPushing', false);
        } else {
            controller.set('crs_name', ''),
            controller.set('crs_alb', 0),
            controller.set('crs_aub', 1),
            controller.set('crs_level', ''),
            controller.set('crs_length', 0),
            controller.set('crs_cat', ''),
            controller.set('crs_subcat', ''),
            controller.set('crs_target', ''),
            controller.set('crs_plan', ''),
            controller.set('crs_content', ''),
            controller.set('crs_imgs', []),
            controller.set('crs_tags', []),
          
            controller.set('isPushing', true);
        }
    }
});
