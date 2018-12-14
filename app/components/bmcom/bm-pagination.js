import Component from '@ember/component';
import { computed } from '@ember/object';


export default Component.extend({
    didReceiveAttrs() {
        this._super(...arguments);
        this.createPageGroup()
    },
    positionalParams: ['pageCount'],
    curPage: 1,
    pageGroup: null,
    nextFlag: computed('curPage', 'pageCount', function() {
        if (this.curPage == this.pageCount) {
            return false;
        } else {
            return true;
        }
    }),
    previousFlag: computed('curPage', 'pageCount', function() {
        if (this.curPage == 1) {
            return false;
        } else {
            return true;
        }
    }),
    actions: {
        pagiOnClick (param) {
            this.set('curPage', param)
            this.updatePageGroup(this.pageGroup)
            this.sendPageNum(this.curPage);
        },
        onFirstClick () {
            this.set('curPage', 1)
            this.updatePageGroup(this.pageGroup)
            this.sendPageNum(this.curPage);
        },
        onPreviousClick () {
            this.set('curPage', this.curPage - 1)
            this.updatePageGroup(this.pageGroup)
            this.sendPageNum(this.curPage);
        },
        onNextClick () {
            this.set('curPage', this.curPage + 1)
            this.updatePageGroup(this.pageGroup)
            this.sendPageNum(this.curPage);
        },
        onLastClick () {
            this.set('curPage', this.pageCount)
            this.updatePageGroup(this.pageGroup)
            this.sendPageNum(this.curPage);
        },
    },
    createPageGroup() {
        let arr = [];
        if (this.pageCount < 5) {
            if (this.pageCount == 0) {
                return;
            } else {
                for (let idx = 1;idx <= this.pageCount;idx++) {
                    let tmpPage = {};
                    tmpPage.pageNum = idx;
                    arr.push(tmpPage)
                }
            }
        } else {
            for (let idx = 1;idx <= 5;idx++) {
                let tmpPage = {};
                tmpPage.pageNum = idx;
                arr.push(tmpPage)
            }
        }
        this.set('pageGroup', arr);
        // console.log(this.pageGroup)
    },
    updatePageGroup() {
        let arr = [];
        if (this.pageCount < 5) {
            return;
        } else {
            if (this.curPage < 3) {
                for (let idx = 1;idx <= 5;idx++) {
                    let tmpPage = {};
                    tmpPage.pageNum = idx;
                    arr.push(tmpPage)
                }
            } else if (this.curPage > this.pageCount - 2) {
                for (let idx = this.pageCount - 4;idx <= this.pageCount;idx++) {
                    let tmpPage = {};
                    tmpPage.pageNum = idx;
                    arr.push(tmpPage)
                }
            } else {
                for (let idx = this.curPage - 2;idx <= this.curPage + 2;idx++) {
                    let tmpPage = {};
                    tmpPage.pageNum = idx;
                    arr.push(tmpPage)
                }
            }
        }
        this.set('pageGroup', arr);
        // console.log(this.pageGroup)
    }
});
