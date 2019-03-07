import Component from '@ember/component';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';


export default Component.extend({
    bmOss: service(),
    positionalParams: ['cls'],
    // attributeBindings: ['style'],
    classNameBindings: ['background'],
    duties: A([]),
    techPics: A([]),
    techPicsOverFlow: 0,
    headImg: 'https://bm-web.oss-cn-beijing.aliyuncs.com/avatar_defautl_96px%20%401x.png',
    hasSetCls: computed(function(){
        return this.cls != null;
    }),
    arrangedDate: computed('hasSetCls', function(){
        if (!this.hasSetCls || this.cls.startDate == null) {
            return '没有安排';
        } else {
            let s = new Date(this.cls.startDate);
            let e = new Date(this.cls.endDate);
            return s.getFullYear() + '/' + (s.getMonth() + 1) + '/' + s.getDate() +
                ' - ' + e.getFullYear() + '/' + (e.getMonth() + 1) + '/' + e.getDate()
        }
    }),
    background: computed('hasSetCls', function(){
        if (!this.hasSetCls || this.cls.startDate == null) {
            return;
        } else {
            if (this.cls.courseTotalCount == 0) {
                return "notarr";
            } else {
                if(this.cls.courseTotalCount == this.cls.courseExpireCount) {
                    return "finish";
                } else {
                    return "going";
                }
            }
        }
    }),
    titleColor: computed('background', function(){
        return 'background: ' + this.background + ';'
    }),
    click() {
        this.onClassCardClicked(this.cls.id);
    },

    handleDuty() {
        let client = this.bmOss.get('ossClient');
        //     if(this.techPics.length < 3) {
        //         let tmpObj = {};
        //         if(proObj.get("icon") != "" && proObj.get("icon") != undefined) {
        //             tmpObj.url = client.signatureUrl(proObj.get("icon"));
        //         } else {
        //             tmpObj.url = this.headImg;
        //         }
        //         this.techPics.pushObject(tmpObj)
        //     } else {
        //         this.set("techPicsOverFlow", this.cls.duties.length - 3)
        //     }
        //     console.log(this.techPics)
        this.duties.forEach((item, index, arr) => {
            item.get("teacher").then(res => {
                // console.log(index)
                // console.log(res)
                if (index > 2) {
                    this.set("techPicsOverFlow", arr.length - 3)
                } else {
                    let tmpObj = {};
                    if(res.get("icon") != "" && res.get("icon") != undefined) {
                        tmpObj.url = client.signatureUrl(res.get("icon"));
                    } else {
                        tmpObj.url = this.headImg;
                    }
                    this.techPics.pushObject(tmpObj)
                }
                console.log(this.techPics)
            }, error => {
                this.bm_error_service.handleError(error)
            })
        })
    },

    didReceiveAttrs() {
        debugger
        console.log(this.cls.get("duties"))
        this.cls.get("duties").then(res => {
            
            this.set("duties", res)
            this.handleDuty()
        }, error => {
            this.bm_error_service.handleError(error)
        })
        // if(this.cls.duties != null) {
        //     this.set("techPics", A([]));
        //     let client = this.bmOss.get('ossClient');
        //     for(let idx = 0;idx < this.cls.duties.length;idx++) {
        //         if(idx < 3) {
        //             let tmpObj = {};
        //             if(this.cls.duties.objectAt(idx).get("teacher").get("icon") != "" && this.cls.duties.objectAt(idx).get("teacher").get("icon") != undefined) {
        //                 tmpObj.url = client.signatureUrl(this.cls.duties.objectAt(idx).get("teacher").get("icon"));
        //             } else {
        //                 tmpObj.url = this.headImg;
        //             }
        //             this.techPics.pushObject(tmpObj)
        //         }
        //     }
        //     if(this.cls.duties.length > 3) {
        //         this.set("techPicsOverFlow", this.cls.duties.length - 3)
        //     }
        // } else {
        //     this.set("techPics", A([]))
        //     this.set("techPicsOverFlow", 0)
        // }
    },

    actions: {
        // promiseResovled(proObj) {
            // console.log(proObj)
            // console.log(proObj.objectAt(0)._type)
            // if(proObj.objectAt(0).type == "duty")
            // this.set("duties", proObj)
        // },
        // promiseResovled(proObj) {
        //     console.log(proObj.get("icon"))
        //     let client = this.bmOss.get('ossClient');
        //     if(this.techPics.length < 3) {
        //         let tmpObj = {};
        //         if(proObj.get("icon") != "" && proObj.get("icon") != undefined) {
        //             tmpObj.url = client.signatureUrl(proObj.get("icon"));
        //         } else {
        //             tmpObj.url = this.headImg;
        //         }
        //         this.techPics.pushObject(tmpObj)
        //     } else {
        //         this.set("techPicsOverFlow", this.cls.duties.length - 3)
        //     }
        //     console.log(this.techPics)
        // }
    },

});
