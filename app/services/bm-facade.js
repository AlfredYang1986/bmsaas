import Service from '@ember/service';
import { inject as service } from '@ember/service';

/**
 * 1. 总控App的状态流程
 * 2. 在Storage上层进行封装
 * 3. 对用户输入进行状态控制
 * 4. 对用户输入进行观察者模式
 */

export default Service.extend({
    store: service(),

    /**
     * 这里管理的是数据的输入
     * 需要利用双向绑定机制和route以及component的生命周期
     * 将绑定数据在开始和结束时，同步更新Model数据
     * 实现application内数据一体观察
     */

    createInputWithCode(code, modelType) {
        return this.store.createRecord(modelType, {
            id: code,
            inputCode: code
        });
    },
    queryInputWithCode(code, modelType) {
        let cur = this.store.peekRecord(modelType, code);
        if (cur == null) {
            return this.createInputWithCode(code, modelType);
        } else return cur;
    },
    removeInputInstance(ins) {
        this.store.deleteRectord(ins);
    },

    /**
     * application端的全局状态的改变, 这些值和上一类不一样，他们只在内存中，通过获得token后一系列操作每次自动创建
     * 例如：当用户登陆后需要保存token，保存用户公司等一些列的操作
     * 例如：xmpp回调等一些列全局状态操作
     * 例如：微信支付，阿里支付，OAuth转发等一些列操作等
     */

    /**
     * 很多只读信息再效率的考虑下，只需要query backend一次，
     * 很难让新人去重新了解 ember-data
     * 或者有很多情况下，一次执行需要很长的时间，需要添加等待界面
     * 而每个界面的等待是一个痛苦的过程，需要一个地方的总控
     */

    /**
     * 在前端Config的情况下，也是需要一个总控，例如：A B 测试，界面主题
     * 也同样管理着默认图片，默认填充，默认提示等
     * 达到CSS浏览器向前兼容的问题
     */

    /**
     * Optional：
     * 多语言或者说是资源的管理，我们现在的项目全部是在handlebar中写中文写死
     * 编程标准，写死属于Magic words
     * 全部需要利用多语言，整理成语言表
     * 这个有一个ember-i18n支持，可以不用自己总控
     */
});
