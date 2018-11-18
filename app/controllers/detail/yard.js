import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
    bm_yard_service: service(),
    bmOss: service(),
    isMorePic: false,
    mainPicIdx: 0,
    listPicIdxUp: 3,
    listPicIdxDown: 0,
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
        nextPic() {
            let idx = this.get('mainPicIdx');
            let up = this.get('listPicIdxUp');
            let down = this.get('listPicIdxDown');
            idx++;
            up++;
            down++;
            if(idx >= (this.imgs.length - 4)) {
                up = this.imgs.length - 1;
                down = this.imgs.length - 4;
            }
            if(idx >= (this.imgs.length - 1)) {
                idx = this.imgs.length - 1;
            }
            console.log(idx,down,up)
            this.set('mainPicIdx', idx);
            this.set('listPicIdxUp', up);
            this.set('listPicIdxDown', down);
        },
        prevPic() {
            let idx = this.get('mainPicIdx');
            let up = this.get('listPicIdxUp');
            let down = this.get('listPicIdxDown');
            idx--;
            up--;
            down--;
            if(idx < 3) {
                up = 3;
                down = 0;
            }
            if(idx < 0) {
                idx = 0;
            }
            console.log(idx,down,up)
            this.set('mainPicIdx', idx);
            this.set('listPicIdxUp', up);
            this.set('listPicIdxDown', down);
        },
        openMorePic() {
            this.set('isMorePic', true);
        },
        closeMorePic() {
            this.set('isMorePic', false);
        }
    },
});
