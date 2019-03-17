import Controller from '@ember/controller';
import { A } from '@ember/array';
import { computed } from '@ember/object';

export default Controller.extend({
    showAddSessionDlg: false,
    pagenum: 1,
    codeImg: 'http://bmsass.oss-cn-beijing.aliyuncs.com/ef94a04d-5874-e2b9-bbab-9d7b15028736?OSSAccessKeyId=LTAINO7wSDoWJRfN&Expires=1552620975&Signature=XcDIa5b%2Beq3htBlb%2BUG%2FVTcWpT0%3D',
    studTitle: A(['姓名'], ['联系电话'], ['性别'], ['年龄'], ['家长称呼'], ['创建时间'], ['操作']),
    refreshFlag: false,

    studs: computed("refreshFlag", function() {
        // return this.store.query('student', { 'page[number]': 1, 'page[size]': 20, "brand-id": localStorage.getItem("brandid")})
        let result;
        result = this.store.query('student', { 'page[number]': 1, 'page[size]': 20, 'status': 0, "brand-id": localStorage.getItem("brandid")});
        result.then(() => {
        }, error => {
            this.bm_error_service.handleError(error)
        })
        return result;
    }),
    page_count: computed(function(){
        return Number.parseInt(localStorage.getItem('students'));
    }),
    actions: {
        successHandled() {
            this.set('showAddSessionDlg', false)
            this.transitionToRoute('edit.potential-stud')
        },
        cancelHandled() {
            this.set('showAddSessionDlg', false)
        },
        handlePageChange(target_page) {
            // let that = this;
            this.set('pagenum', target_page)
            this.store.query('student', { 'page[number]': target_page, 'page[size]': 20, "brand-id": localStorage.getItem("brandid")}).then((res) => {
                this.set('studs', res)
            }, error => {
                this.bm_error_service.handleError(error)
            })
        },
        searchStud() {

        }
    }
});
