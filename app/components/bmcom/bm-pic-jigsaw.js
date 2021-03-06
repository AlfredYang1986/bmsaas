import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Component.extend({
    positionalParams: ['picData', 'cover'],
    images: A(),
    classNames: ['pic-jigsaw'],
    bmOss: service(),
    isMorePic: false,
    mainPicIdx: 0,
    listPicIdxUp: 3,
    listPicIdxDown: 0,
    flag: 0,
    cover: '',
    init() {
        this._super(...arguments);

        this.initPicJigsaw()
    },
    initPicJigsaw() {
        let client = this.bmOss.get('ossClient');
        this.picData.then(data => {
            let result = data
            .filter((item) => {return item.img !== "" && item.flag === this.get('flag')})
            .map(v => {return {url: client.signatureUrl(v.img), tag: v.tag}})
            if (this.cover != '') {
                let tmpCover = {url: client.signatureUrl(this.cover), tag: "封面图片"};
                result.unshift(tmpCover);
            }
            this.set("images", result)
        })
    },
    actions: {
        nextPic() {
            // let idx = this.get('mainPicIdx');
            let up = this.get('listPicIdxUp');
            let down = this.get('listPicIdxDown');
            // idx++;
            // up++;
            // down++;
            if (up < this.images.length - 1) {
                up++;
                down++;
            }
            // if(idx >= (this.images.length - 4)) {
            //     up = this.images.length - 1;
            //     down = this.images.length - 4;
            // }
            // if(idx >= (this.images.length - 1)) {
            //     idx = this.images.length - 1;
            // }
            // this.set('mainPicIdx', idx);
            this.set('listPicIdxUp', up);
            this.set('listPicIdxDown', down);
        },
        prevPic() {
            // let idx = this.get('mainPicIdx');
            let up = this.get('listPicIdxUp');
            let down = this.get('listPicIdxDown');
            // idx--;
            if (down > 0) {
                up--;
                down--;
            }
            // if(idx < 3) {
            //     up = 3;
            //     down = 0;
            // }
            // if(idx < 0) {
            //     idx = 0;
            // }
            // this.set('mainPicIdx', idx);
            this.set('listPicIdxUp', up);
            this.set('listPicIdxDown', down);
        },
        openMorePic() {
            this.set('isMorePic', true);
        },
        closeMorePic() {
            this.set('isMorePic', false);
        },
        onSmPicClick(selIndex) {
            let idx = this.get('mainPicIdx');
            idx = selIndex
            this.set('mainPicIdx', idx);
        }
    },
});
