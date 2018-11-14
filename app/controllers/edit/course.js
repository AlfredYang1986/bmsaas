import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({

    mock_data: service(),
    bm_session_service: service(),

    cur_page_idx: 0,

    crs_cat: '',
    crs_sub_cat: '',
    isPushing: false,
    refresh_token: 'start-data',
    // refresh_sub_token: 'start-data',

    cat_candi: computed(function(){
        return this.mock_data.queryCateCandidate();
    }),

    sub_candi: computed('crs_cat', function(){
        debugger
        return this.mock_data.querySubCatCondidate(this.crs_cat);
    }),

    refresh: computed('refresh_token', function(){
        this.set('crs_cat', this.bm_session_service.session.Cate.title);
        return '';
    }),

    actions: {
        saveCourseBtnClicked() {
            let that = this
            let callback = {
                onSuccess: function() {
                    that.transitionToRoute('course');
                },
                onFail: function(err) {
                    console.log('error');
                }
            }
            this.bm_session_service.saveUpdate(callback); 
        },
        reserveCourse() {
            this.transitionToRoute('courseReserve');
        },
    },
});
