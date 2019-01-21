import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
    positionalParams: ['picData'],
    classNames: ['pic-jigsaw'],
    bmOss: service(),
    isMorePic: false,
    mainPicIdx: 0,
    listPicIdxUp: 3,
    listPicIdxDown: 0,
    // imgs: null,
    imgs: computed("picData", function(){
        // TODO: 重渲染问题 hbs没绑上
        let client = this.bmOss.get('ossClient');
        let tempImgs = [];
        // if (this.picData.length != 0) {
        let that = this
        let onSuccess = function() {
            // console.log(that.picData)
            for (let index = 0; index < that.picData.length; index++) {
                if(that.picData.objectAt(index).img == "") {
                    // debugger
                    return;
                }
                let url = client.signatureUrl(that.picData.objectAt(index).img);
                let tag = that.picData.objectAt(index).tag;
                let tempImg = {url, tag};
                tempImgs.push(tempImg);
                // debugger
                return tempImgs;
            }
        }
        let onFail = function() {}
        this.picData.then(onSuccess, onFail)
        // }
        // console.log(tempImgs)
        // debugger
        // this.rerender() 
    }),
    didReciveAttrs() {
        // let client = this.bmOss.get('ossClient');
        // let tempImgs = [];
        // // if (this.picData.length != 0) {
        // let that = this
        // let onSuccess = function() {
        //     console.log(that.picData)
        //     for (let index = 0; index < that.picData.length; index++) {
        //         if(that.picData.objectAt(index).img == "") {
        //             return;
        //         }
        //         let url = client.signatureUrl(that.picData.objectAt(index).img);
        //         let tag = that.picData.objectAt(index).tag;
        //         let tempImg = {url, tag};
        //         tempImgs.push(tempImg);
        //     }
        //     this.set("imgs", tempImgs)
        //     this.rerender()
        //     console.log(that.imgs)

        // }
        // let onFail = function() {}
        // this.picData.then(onSuccess, onFail)
        // // }
        // console.log(tempImgs)
        // // debugger
        // // this.rerender() 
        // // return tempImgs;
    },
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
