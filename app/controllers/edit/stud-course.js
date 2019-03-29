import Controller from '@ember/controller';
import { A } from '@ember/array';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import EmberObject from '@ember/object';

export default Controller.extend({
    bm_pt_stud_service: service(),
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
    applicant: null,
    contact: undefined,
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
        if(isNaN(this.contact)) {
            this.toast.error('', '请输入电话号码', that.toastOptions);
        } else {
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
        }

        return result;
    }),
    totalsp: computed('curItems', 'totalpp', function() {
        let totalsp = 0;
        this.curItems.forEach((item) => {
            totalsp = Number(totalsp) + Number(item.signedPrice);
        })
        return totalsp
    }),
    teacher: computed('teacherId', function() {
        if(this.teacherId != undefined) {
            return this.store.find('teacher', this.teacherId);
        } else {
            return
        }

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
        searchCourse() {

        },
        cancelInputBtnClicked() {
            this.set('contact', undefined);
            this.set('studList', false);
            this.model.courseList.forEach(item => {
                item.set('state', 0);
            })
            this.set('totalpp', 0);
            this.set('totalsp', 0);
            this.set('moneyReceived', undefined);
            this.transitionToRoute("stud");
        },
        radioChange(param) {
            this.set('studInfo', param)
            let that = this;
            this.store.find('student', param.id).then(res => {
                res.kid.then(result => {
                    that.set('applicant', result.applicant);
                })
            })


        },
        addStud() {
            if(this.studInfo == null) {
                this.toast.error('', '请选择一个孩子', this.toastOptions);
            } else {
                this.set('cur_page_idx', 1);
            }
        },
        addCourse() {
            if(this.curItems == null || this.curItems.length == 0) {
                this.toast.error('', '请至少选择一门课程', this.toastOptions);
            } else {
                this.set('cur_page_idx', 2);
            }
        },
        deleteCour(param) {
            this.curItems.forEach(item => {
                if(param.id == item.id) {
                    item.set('state', 0);
                    this.curItems.removeObject(param);
                }
            })
        },
        addPtStudModal() {
            this.set('showAddStud', true);
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
            if(param.state == undefined) {
                param.set('state', 1);
            }

            if(this.checkArr.length == 0) {
                this.checkArr.pushObject(param)
            } else {
                this.checkArr.forEach(item => {
                    if(item.state == true) {
                        item.set('state', 1)
                    } else if(item.state == false) {
                        item.set('state', 0)
                    }
                    if(item.id == param.id && item.state == 1) {
                        param.set('state', 0);
                        item.set('state', 0);
                    } else if(item.id == param.id && item.state == 0) {
                        item.set('state', 1)
                    }
                })
                if(param.state == 1) {
                    this.checkArr.pushObject(param);
                }
            }
            // this.checkArr.filter(item => {
            //     return item.state == 1;
            // })
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
            let sprice = Number(param.standardPrice);
            if(Number(param.signedPrice) >= Number(param.preferentialPrice)) {
                let sp = Number(sprice) - Number(param.preferentialPrice);
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
            this.curItems.forEach((item) => {
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
            that.model.transaction.set('applicant', this.applicant);
            that.model.transaction.set('teacher', this.teacher)
            this.model.transaction.save().then(() => {
                that.store.find('student', that.studInfo.id).then(res => {
                    res.set('status', 1);
                    res.save();
                })
                that.transitionToRoute('stud');
                that.toast.success('', '报课成功', that.toastOptions);
            })


        }
    },
});
