import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import EmberObject from '@ember/object';
import $ from 'jquery';

export default Component.extend({
    toastOptions: EmberObject.create({
        closeButton: false,
        positionClass: 'toast-top-center',
        progressBar: false,
        timeOut: '2000',
    }),
    bmOss: service(),
    positionalParams: ['imgObj', 'img', 'tag', 'canEdit', 'canEditTag', 'needTag', 'canDeleteObj'],
    imgObj: '',
    img: '',
    tag: '',
    canEdit: false,
    canEditTag: false,
    needTag: false,
    canDeleteObj: false,
    canDeleteImg: true,
    deleteIcon: 'https://bm-web.oss-cn-beijing.aliyuncs.com/icon_remove%402x.png',
    isNull: computed('img', function(){
        return this.img == null || this.img.length == 0;
    }),
    concertImgPath: computed('img', function(){
        let client = this.bmOss.get('ossClient');

        return client.signatureUrl(this.img);
    }),
    upid: computed(function(){
        return this.guid();
    }),
    actions: {
        inputChanged() {
            // let client = this.bmOss.get('ossClient');

            let form = document.getElementById(this.upid);
            let formData = new FormData(form)
            // console.log(form[0].files[0])
            if (form[0].files[0].size > 1024000) {
                this.toast.error('', '文件大小超过1M，请重新上传！', this.toastOptions);
                return;
            }
            var that = this;
            $.ajax({
                url: '/v2/UploadToOss',
                type: 'post',
                data: formData,
                processData: false,
                contentType: false,
                success: function(res) {
                    // that.get('debug').log(res.result.file);
                    that.set('img', res.result.file);
                },
                error: function(err) {
                    // that.get('debug').log('上传文件失败');
                    that.get('debug').log('error: ' + err);
                }
            })
        },
        deleteImg() {
            this.set('img', '');
            document.getElementById(this.upid).lastElementChild.childNodes[7].value = '';
            document.getElementById('uploadImg').value = '';
        },
        deleteObj() {
            this.onDeleteObj(this.imgObj)
        }
    },
    guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },

    didRender() {
        if (this.tag == "initTag") {
            this.set('tag', '图片描述');
            // document.getElementById(this.upid).lastElementChild.getElementsByTagName("input")[0].blur(this.lala())
            // document.getElementById(this.upid).lastElementChild.getElementsByTagName("input")[0].focus(this.lala())
            document.getElementById(this.upid).lastElementChild.getElementsByTagName("input")[0].click()
        }
    }
});
