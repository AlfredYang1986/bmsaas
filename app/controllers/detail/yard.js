import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
    bm_yard_service: service(),
    bmOss: service(),
    isMorePic: false,
    cover: computed(function(){
        let client = this.bmOss.get('ossClient');
        // let imgUrls;
        let url;
        if (this.bm_yard_service.yard !== null){
            url = client.signatureUrl(this.bm_yard_service.yard.Tagimgs[0].img);
            console.log(url)
            return url;
        }else{
            return "";
        }
        // for (let idx = 0; idx < this.bm_yard_service.yard.Tagimgs; idx++) {
        //     imgUrls.push(url);
        // }

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
