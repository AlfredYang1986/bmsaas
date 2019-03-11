import Component from '@ember/component';
import { A } from '@ember/array';

export default Component.extend({
    positionalParams: ['title', 'checkboxItem', 'checkboxTitle', 'curItems','flag'],
    checkboxTitle: '',
    curItems: A([]),
    handledArr: A([]),
    checkStatus: '',
    handledCheckboxItem: A([]),
    // handledCheckboxItem: computed('curItems', function() {
    //     let tempArr = [];
    //     for(let idx = 0;idx < this.checkboxItem.length;idx++) {
    //         let tmpObj = {};
    //         tmpObj.value = this.checkboxItem[idx]
    //         if (this.curItems != null) {
    //             for(let innerIdx = 0;innerIdx < this.curItems.length;innerIdx++) {
    //                 if (this.checkboxItem[idx] == this.curItems[innerIdx]) {
    //                     tmpObj.status = 'checked';
    //                 } else {
    //                     tmpObj.status = '';
    //                 }
    //                 tempArr.push(tmpObj)
    //                 }
    //             } else {
    //                 tmpObj.status = '';
    //                 tempArr.push(tmpObj)
    //             }
    //         }
    //     console.log(tempArr)
    //     return tempArr
    // }),
    
    didReceiveAttrs() {
        let tempArr = [];
        for(let idx = 0;idx < this.checkboxItem.length;idx++) {
            let tmpObj = {};
            tmpObj.value = this.checkboxItem[idx]
            if (this.curItems != null) {
                for(let innerIdx = 0;innerIdx < this.curItems.length;innerIdx++) {
                    if (this.checkboxItem[idx] == this.curItems[innerIdx]) {
                        tmpObj.status = 'checked';
                        break;
                    } else {
                        tmpObj.status = '';
                    }
                }
                tempArr.push(tmpObj)
                } else {
                    tmpObj.status = '';
                    tempArr.push(tmpObj)
                }
            }
        this.set('handledCheckboxItem', tempArr)
    },
    

    // actions: {
    //     onClick (value) {
    //         if (this.handledArr.indexOf(value) == -1) {
    //             this.handledArr.push(value)
    //         } else {
    //             this.handledArr.splice(this.handledArr.indexOf(value), 1)
    //         }
    //         // console.log(this.handledArr)
    //     }
    // },
});
