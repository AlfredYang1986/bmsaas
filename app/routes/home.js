import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import RSVP from 'rsvp';

export default Route.extend({
    model() {

        let brand = this.store.peekRecord('bmbrand', 'i am a brand');
        if (brand == null) {
            brand = this.store.createRecord('bmbrand', {
                id: 'i am a brand',
                title: 'PRO科学空间',
                subtitle: '彩色方块的转动中感受魔方的魅力。',
                brand_tags: A(['场景教学', '先进理念', '专业团队']),
                found_data: '2000年7月',
                found_stroy: 'PRO科学空间是PRO集团高端幼儿教育品牌，专注于3-12岁高端幼少儿STEAM教育，在美国STEAM教育理念基础上，融合了符合中国儿童成长的语言教育，以国际幼少儿英语，数学逻辑思维，STEAM编程课程为主。旨在培养幼少儿的语言思维、创造性思维、空间想象力、逻辑思维、科学精神、动手能力及核心素养。目前在天津、北京、上海、广州、南京、武汉、苏州7个城市设立18个国际学习中心。',
                team_des: 'PRO科学空间拥有强大的师资团队，授课讲师均来自知名企业从事一线科研工作并拥有丰富的项目科研经验。教师团队均获硕士及博士学历并在科研领域行业中从业5年以上 ，我们严格把关教学品质，为孩子的科学教育奠定坚实的基础。'
            })

            let reward01 = this.store.createRecord('bmbrand-reward', {
                id: 'brand reward 01',
                img_src: '../images/reward01.jpeg',
                reward_des: '2014-全国青少年编程创新大赛'
            })

            reward01.set('bmbrand', brand);

            let reward02 = this.store.createRecord('bmbrand-reward', {
                id: 'brand reward 02',
                img_src: '../images/reward02.jpeg',
                reward_des: '2014-全国青少年编程创新大赛'
            })

            reward02.set('bmbrand', brand);

            let reward03 = this.store.createRecord('bmbrand-reward', {
                id: 'brand reward 03',
                img_src: '../images/reward03.jpeg',
                reward_des: '2014-全国青少年编程创新大赛'
            })

            reward03.set('bmbrand', brand);

            let reward04 = this.store.createRecord('bmbrand-reward', {
                id: 'brand reward 04',
                img_src: '../images/reward04.jpeg',
                reward_des: '2014-全国青少年编程创新大赛'
            })

            reward04.set('bmbrand', brand);

            let tmp = A([reward01, reward02, reward03, reward04]);
            brand.set('rewards', tmp);
        }

        return RSVP.hash({
            brand: brand
        });
    }
});
