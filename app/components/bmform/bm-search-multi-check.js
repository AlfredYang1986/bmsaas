import Component from '@ember/component';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';
import EmberObject from '@ember/object';

export default Component.extend({
    store: service(),
    // tagName: '',
    positionalParams: ['multiData' ,'type', 'curItems', 'filterData'],
    curItems: A([]),
    searchTitle: "选择学生",
    handledMultiData: null,
    filterData: null,
    clonedData: null,
    inputVal: "",

    actions: {
        onSearchChange(keyWord) {
            let reg = new RegExp(keyWord);
            let arr = [];
            for (let i = 0; i < this.clonedData.length; i++) {
                if (reg.test(this.clonedData[i].name) || reg.test(this.clonedData[i].contact)) {
                    arr.push(this.clonedData[i]);
                }
            }
            this.set('handledMultiData', arr)
            // console.log(this.handledMultiData)
        },
        onCheckChange(param) {

            this.handledMultiData.forEach(item => {
                if(item.id === param.id) {
                    item.state ? set(item, "state", 0) : set(item, "state", 1)
                }
                // console.log(item.state)
            })

            let tempObj = this.store.peekRecord("student", param.id)
            let haveCurItemFlag = false;
            
            if(this.curItems == null) {
                this.set("curItems", A([]));
                this.curItems.pushObject(tempObj);
            } else {
                this.curItems.forEach(item => {
                    if(item.id == tempObj.id) {
                        haveCurItemFlag = true;
                    }
                })
                if(haveCurItemFlag) {
                    this.curItems.removeObject(tempObj);
                } else {
                    this.curItems.pushObject(tempObj);
                }
            }
            // this.rerender()
            // window.console.log(this.curItems);
        },
    },

    didReceiveAttrs() {
        let tempArr = A([])
        for(let idx = 0;idx < this.multiData.length;idx++) {
            let tempObj = EmberObject.create({})
            tempObj.id = this.multiData.objectAt(idx).id;
            tempObj.name = this.multiData.objectAt(idx).name;
            tempObj.gender = this.multiData.objectAt(idx).gender;
            tempObj.dob = this.multiData.objectAt(idx).dob;
            if(this.multiData.objectAt(idx).guardians.length != 0) {
                tempObj.contact = this.multiData.objectAt(idx).guardians.firstObject.contact;
            } else {
                tempObj.contact = ""
            }
            tempObj.state = 0;
            tempArr.pushObject(tempObj)
        }
        this.set('handledMultiData', tempArr)
        if (this.filterData != null) {
            for(let idx = 0;idx < this.handledMultiData.length;idx++) {
                for (let idx2 = 0; idx2 < this.filterData.length; idx2++) {
                    if (this.handledMultiData[idx].id == this.filterData.objectAt(idx2).id) {
                        this.handledMultiData.removeObject(this.handledMultiData[idx]);
                    }
                }
            }
        }
        this.set('clonedData', this.handledMultiData)
        
    },
    // deepClone(source){
    //     return source;
    //     // return JSON.parse(JSON.stringify(source));
    // },

});
