import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
    positionalParams: ['session'],
    bmOss: service(),
    isMorePic: false,
    cover: computed("session" ,function(){
        let client = this.bmOss.get('ossClient');
        let session = this.session;
        
        if(session !== null ) {
            let url = client.signatureUrl(this.session.cover);
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
