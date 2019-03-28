import Controller from '@ember/controller';
import { A } from '@ember/array';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import EmberObject from '@ember/object';

export default Controller.extend({
    inputVal: false,
    cur_page_idx: 0,
    showAddCourse: false,
    stud: null,
    headImg: 'https://bm-web.oss-cn-beijing.aliyuncs.com/avatar_defautl_96px%20%401x.png',
    sex_idx: 0,
    rela_idx: 0,
    checkArr: A([]),
    curItems: null,
    totalpp: 0,
    moneyReceived: undefined,
    studInfo: null,
    genderCheck: A(['男', '女']),
    relaChecked: A(['父亲', '母亲', '其他']),
    grade:A([{name: '学龄前'}, {name: '小班'}, {name: '中班'}, {name: '大班'}, {name: '小学一年级'}, {name: '小学二年级'}, {name: '小学三年级'}, {name: '小学四年级'}, {name: '小学五年级'}, {name: '小学六年级'}]),
    bm_error_service: service(),
    toast: service(),
    toastOptions: EmberObject.create({
        closeButton: false,
        positionClass: 'toast-top-center',
        progressBar: false,
        timeOut: '2000',
    }),
    didInsertElement() {
        this.set(this.cur_page_idx, 0);
    },
    studs: computed("refreshFlag", 'type', function() {
        let result;
        let that = this;
        result = this.store.query('student', {'contact': this.contact});
        result.then((res) => {
            if(res.length > 0) {
                that.set('inputVal', true);
            } else {
                that.set('showAddStud', true)
            }
        }, error => {
            this.bm_error_service.handleError(error)
        })
        return result;
    }),
    totalsp: computed('curItems', 'totalpp', function() {
        let totalsp = 0;
        this.curItems.forEach((item) => {
            totalsp = Number(totalsp) + Number(item.signedPrice);
        })
        return totalsp
    }),

    origin:A([{name: '学员转介绍'}, {name: '电话推广'}, {name: '小程序'}, {name: '线下活动推广'}, {name: '其他'}]),

    actions: {
        searchStud() {
            this.toggleProperty('refreshFlag');
            this.set('studList', true);
        },
        addStudCourse() {
            this.set('showAddCourse', true);
        },
        cancelAdd() {
            this.set('showAddCourse', false)
        },
        successAdd() {

        },
        searchCourse() {

        },
        cancelInputBtnClicked() {
            this.transitionToRoute("stud")
        },
        radioChange(param) {
            this.set('studInfo', param)
            // stud.save().then(() => {
            //     // if(stud.guardians.firstObject.relationShip == '') {
            //     //     that.model.stud.guardians.objectAt(0).set("relationShip", '爸爸')
            //     // }
            //     that.transitionToRoute('potential-stud')
            // }, error => {
            //     that.bm_error_service.handleError(error)
            // })

        },
        addPtStudModal() {
            this.set('showAddStud', true);
        },
        checkChange() {
            this.set('course')
        },
        cancelAdd() {
            this.set('showAddStud', false)
        },
        successAdd() {
            let that = this;
            let ptname = this.model.stud.name;
            let ptgender = this.model.stud.gender;
            let ptschool = this.model.stud.school;
            let ptgrade = this.model.stud.grade;
            let ptdob = this.model.stud.dob;
            let ptgn = this.model.stud.guardians.objectAt(0).name;
            let ptcontact = this.model.stud.guardians.objectAt(0).contact;
            let ptrs = this.model.stud.guardians.objectAt(0).relationShip;
            if(ptname == '') {
                that.toast.error('', '请填写孩子姓名', that.toastOptions);
            } else if(ptgn == '') {
                that.toast.error('', '请填写家长姓名', that.toastOptions);
            } else if(ptcontact == '') {
                that.toast.error('', '请填写正确的联系方式', that.toastOptions);
            } else {
                this.bm_pt_stud_service.savePtStud(ptname, ptgender, ptschool, ptgrade, ptdob, ptgn, ptcontact, ptrs).then(() => {
                    that.transitionToRoute('potential-stud');
                    that.toast.success('', '添加成功', that.toastOptions);
                })
            }
        },
        cancelCourse() {
            // this.set('curItems', null);
            this.set('showAddCourse', false)
        },
        successCourse() {
            this.set('showAddCourse', false)
        },
        checkChange(param) {
            param.set('state', 1);
            if(this.checkArr.length == 0) {
                this.checkArr.pushObject(param)
            } else {
                this.checkArr.forEach(item => {
                    if(item.id == param.id) {
                        param.set('state', 0);
                        item.set('state', 0);
                    }
                })
                if(param.state == 1) {
                    this.checkArr.pushObject(param);
                }
            }
            let arrCheck = this.checkArr.filter(item => {
                return item.state == 1;
            })
            let tempObj = this.store.peekRecord('reservableitem', param.id);
            tempObj.set('preferentialPrice', 0);
            tempObj.set('standardPrice', tempObj.get('sessioninfo').get('standardPrice'));
            tempObj.set('signedPrice', tempObj.get('sessioninfo').get('standardPrice'));
            let haveCurItemFlag = false;
            if(this.curItems == null) {
                this.set('curItems', A([]));
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
        },
        onChangeInner(param) {
            let sprice = param.standardPrice;
            if(param.signedPrice >= param.preferentialPrice) {
                let sp = sprice - param.preferentialPrice;
                this.curItems.forEach((item) => {
                    if(param.id == item.id) {
                        item.set('signedPrice', sp);
                    }
                })
            } else {
                this.curItems.forEach((item) => {
                    if(param.id == item.id) {
                        item.set('preferentialPrice', 0);
                        item.set('signedPrice', sprice);
                    }
                })
            }
            let totalpp = 0;
            // let totalsp = 0;
            this.curItems.forEach((item) => {
                totalpp = Number(totalpp) + Number(item.preferentialPrice);
                // totalsp = Number(totalsp) + Number(item.signedPrice);
            })
            this.set('totalpp', totalpp);
            // this.set('totalsp', totalsp);
        },
        totalsp() {
            this.set('moneyReceived', this.totalsp);
        },
        confirm() {
            let that = this;
            let atta = A([]);
            this.curItems.forEach((item, index, arr) => {
                that.model.attachable.set('reservableId', item.id);
                that.model.attachable.set('sessioninfoId', item.get('sessioninfo').get('id'));
                that.model.attachable.set('title',  item.get('sessioninfo').get('title'));
                that.model.attachable.set('alb',  item.get('sessioninfo').get('alb'));
                that.model.attachable.set('aub',  item.get('sessioninfo').get('aub'));
                that.model.attachable.set('standardCourseCount',  item.get('sessioninfo').get('standardCourseCount'));
                that.model.attachable.set('standardPrice',  item.get('sessioninfo').get('standardPrice'));
                that.model.attachable.set('standardPriceUnit',  item.get('sessioninfo').get('standardPriceUnit'));
                that.model.attachable.set('preferentialPrice', item.preferentialPrice);
                that.model.attachable.set('signedPrice', item.signedPrice);
                that.model.attachable.set('student', that.studInfo);
                atta.push(that.model.attachable);
            })
            that.model.transaction.set('attachable', atta);
            let timestamp = Date.parse(new Date());
            that.model.transaction.set('orderTime', timestamp)
            that.model.transaction.set('moneyReceivable', this.totalsp);
            that.model.transaction.set('moneyReceived', this.moneyReceived);
            this.model.transaction.save();
        }
    },
});
