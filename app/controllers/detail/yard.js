import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
    bm_yard_service: service(),
    bmOss: service(),
    isMorePic: false,
    imgs: computed(function(){
        let client = this.bmOss.get('ossClient');
        let imgs = [];
        for (let index = 0; index < this.bm_yard_service.yard.Tagimgs.length; index++) {
            let url = client.signatureUrl(this.bm_yard_service.yard.Tagimgs[index].img);
            let tag = this.bm_yard_service.yard.Tagimgs[index].tag;
            let temp = {url, tag};
            imgs.push(temp);
        }
        return imgs;
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
