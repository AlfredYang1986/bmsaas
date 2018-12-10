import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
    bmOss: service(),
    positionalParams: ['img', 'tag', 'canEdit', 'needTag'],
    img: '',
    tag: '',
    canEdit: false,
    needTag: false,
    deleteIcon: 'https://bm-web.oss-cn-beijing.aliyuncs.com/icon_remove%402x.png',
    isNull: computed('img', function(){
        return this.img == null || this.img.length == 0;
    }),
    concertImgPath: computed('img', function(){
        let client = this.bmOss.get('ossClient');

        let url = client.signatureUrl(this.img);
        console.log(url);
        return url;
    }),
    upid: computed(function(){
        return this.guid();
    }),
    actions: {
        inputChanged() {
            let client = this.bmOss.get('ossClient');

            let form = document.getElementById(this.upid);
            let formData = new FormData(form)

            var that = this;
            Ember.$.ajax({
                url: '/upload',
                type: 'post',
                data: formData,
                processData: false,
                contentType: false,
                success: function(res) {
                    that.get('logger').log(res.result.file);
                    that.set('img', res.result.file);
                },
                error: function(err) {
                    that.get('logger').log('上传文件失败');
                    that.get('logger').log('error: ' + err);
                }
            })
        },
        deleteImg() {
            this.set('img', '');
            document.getElementById('uploadImg').value = '';
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
});
