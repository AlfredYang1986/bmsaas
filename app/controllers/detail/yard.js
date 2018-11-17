import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
    bm_yard_service: service(),
    bmOss: service(),
    isMorePic: false,
    cover: computed("bm_yard_service" ,function(){
        let client = this.bmOss.get('ossClient');
        let yard = this.bm_yard_service.yard;
        // console.log(yard);
        if(yard !== null ) {
            let url = client.signatureUrl(yard.cover);
            // console.log(yard);
            // console.log(yard.cover);
            // console.log(url);
            return url;
        }
        
    }),
    actions: {
        openMorePic() {
            this.set('isMorePic', true);
        },
        closeMorePic() {
            this.set('isMorePic', false);
        }
    },
});
