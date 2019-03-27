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
            let stud = param;
            this.set('studInfo', stud)
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
            console.log(tempObj);
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
            console.log(this.curItems)
        },
        confirm() {
            
        }
    },
});
