import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { computed } from '@ember/object';
// import { inject as service } from '@ember/service';

export default Route.extend({
    // mock_data: service(),
    model() {

        // this.mock_data.sureBrand();
        // let brand = this.store.peekRecord('bmbrand', 'i am a brand');
        //
        // return RSVP.hash({
        //     brand: brand,
        //     brand_display_name: computed('brand', function(){
        //         return brand.found_date.get('year')+ '年' + brand.found_date.get('month')+ '月';
        //     })
        // });

        let brand = this.get('pmController').get('Store').createModel('bm-brand', {
            id: this.guid(),
            title: "百造PACEE",
            subtitle: "更自如地成为学习的掌控者",
            logo: "meiyoulogo",
            slogan: "创造自己的世界, FOR FUTURE INNOVATOR",
            brand_tags: ["更自如地成为学习的掌控者","提前养成全科思维","数理工程逻辑/人文美学素养","左脑右脑全脑发育"],
            foundStory: "创造自己的世界创造自己的世界创造自己的世界创造自己的世界",
            edu_idea: "全球教育品牌百造学堂，由MIT、哈佛、清华、港大等全球三十多所名校毕业的、百名工程师和艺术家联合开发。以源自美国智力研究泰斗、国家心理学会会长吉尔福特的智力结构模型为研发基础，着眼于数理逻辑和语言人文两大知识领域，通过探究、创造、规划、演绎的系统训练，激发孩子的自我意识和创造能量，在创造过程中高效掌握知识与技能。",
            about_us: "由MIT、哈佛、清华、港大等全球三十多所名校毕业的、百名工程师和艺术家联合开发，获教育学专家、人工智能专家等技术支持。",
            Cate:  this.get('pmController').get('Store').createModel('bm-category',{
                id: this.guid(),
                title: "儿童思维训练",
                subtitle: "多元思维训练课程",
            })
        });
        brand.get('Honors').pushObject(this.get('pmController').get('Store').createModel('bm-honor', {
            id: this.guid(),
            tag: "2015年哈佛大学创新实验室创意大奖",
            img: "没有img"
        }))
        brand.get('Honors').pushObject(this.get('pmController').get('Store').createModel('bm-honor', {
            id: this.guid(),
            tag: "哈佛大学创业大奖",
            img: "没有img"
        }))
        brand.get('Certifications').pushObject(this.get('pmController').get('Store').createModel('bm-certification', {
            id: this.guid(),
            tag: "先锋机构选择的少儿思维教育品牌",
            img: "没有img"
        }))
        brand.get('Certifications').pushObject(this.get('pmController').get('Store').createModel('bm-certification', {
            id: this.guid(),
            tag: "全球顶尖学府",
            img: "没有img"
        }))
        let json = this.get('pmController').get('Store').object2JsonApi(brand);
        return this.get('pmController').get('Store').transaction('/api/v1/pushbrand/0', 'bm-brand', json)
            .then(data => {
                this.get('logger').log(data);
                return data;
            })
            .catch(data => {
                this.get('logger').log(data);
            })

        return RSVP.hash({
            brand: brand,
            brand_display_name: computed('brand', function(){
                return brand.found_date.get('year')+ '年' + brand.found_date.get('month')+ '月';
            })
        });
    },
    guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
});
