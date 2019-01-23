import Component from '@ember/component';

export default Component.extend({
    // tagName: '',
    positionalParams: ['multiData' ,'type', 'curItems', 'filterData'],
    searchTitle: "选择学生",
    handledMultiData: null,
    filterData: null,
    clonedData: null,
    inputVal: "",

    actions: {
        onSearchChange(keyWord) {
            // console.log(keyWord)
            let reg = new RegExp(keyWord);
            let arr = [];
            for (let i = 0; i < this.clonedData.length; i++) {
                if (reg.test(this.clonedData[i].name) || reg.test(this.clonedData[i].Guardians[0].contact)) {
                    arr.push(this.clonedData[i]);
                }
            }
            this.set('handledMultiData', this.deepClone(arr))
            // console.log(this.handledMultiData)
        },
        onCheckChange(param) {
            // console.log(param)
        },
    },

    didReceiveAttrs() {
        this.clonedData = this.deepClone(this.multiData)
        this.handledMultiData = this.deepClone(this.multiData)
        // console.log(this.multiData)
        // console.log(this.handledMultiData)
        if(this.filterData != null) {
            for(let idx = 0;idx < this.handledMultiData.length;idx++) {
                for(let idx2 = 0;idx2 < this.filterData.length;idx2++) {
                    if(this.handledMultiData[idx].id == this.filterData[idx2].id) {
                        this.handledMultiData.removeObject(this.handledMultiData[idx]);
                    }
                }
            }
        }
        
        // console.log(this.handledMultiData)
    },
    deepClone(source){
        return ''
        // return JSON.parse(JSON.stringify(source));
    },

});
