import Component from '@ember/component';
import { inject as service } from '@ember/service'; 
import { computed } from '@ember/object'; 

export default Component.extend({
    mock_data: service(),
    positionalParams: ['bmapplication'],
    course_lst: computed(function(){
        return this.mock_data.courseCandi();
    }),
    yard_lst: computed(function(){
        return this.mock_data.yardCandi();
    })
});
