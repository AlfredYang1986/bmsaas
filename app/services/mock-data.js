import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Service.extend({
    init() {
        this.sureBrand();
        this.sureStud();
    },
    store: service(),
    sureBrand() {
        console.log('sure brand');
        let brand = this.store.peekRecord('bmbrand', 'i am a brand');
        if (brand == null) {
            brand = this.store.createRecord('bmbrand', {
                id: 'i am a brand',
                title: 'PRO科学空间',
                subtitle: '彩色方块的转动中感受魔方的魅力。',
                brand_tags: A(['场景教学', '先进理念', '专业团队']),
                // found_data: '2000年7月',
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

            let fd = this.store.createRecord(('date-format'), {
                id: 'brand found date',
                year: 2000,
                month: 7,
                day: 1
            })

            brand.set('found_date', fd);

            let tmp = A([reward01, reward02, reward03, reward04]);
            brand.set('rewards', tmp);
        }
    },
    sureStud() {
        console.log('sure stud');
        let stud_lst = this.store.peekAll('bmstud');
        if (stud_lst.length == 0) {
            let dob_stud_01 = this.store.createRecord('date-format', {
                id: 'i am stud person dob 01',
                year: 2016,
                month: 7,
                day: 1
            })
            let person_stud_01 = this.store.createRecord('bmperson', {
                id: 'i am stud person 01',
                icon: '../images/stud-normal.png',
                name: '王大锤',
                nickname: '锤子',
                age: 4,
                gender: 1,
                contact: '',
                register_date: new Date(),
            })
            person_stud_01.set('dob', dob_stud_01);
            let stud01 = this.store.createRecord('bmstud', {
                id: 'i am stud 01',
                school: '霍格沃茨' 
            })
            stud01.set('me', person_stud_01);

            let person_parent_01 = this.store.createRecord('bmperson', {
                id: 'i am stud parent 01',
                icon: '../images/stud-normal.png',
                name: '王巨锤',
                nickname: '为什么家长需要昵称',
                age: 34,
                gender: 1,
                contact: '13720200856',
                wechat: '',
                register_date: new Date(),
            })
            let guardian_01 = this.store.createRecord('bmguardian', {
                id: 'i am stud guardian 01',
                rs: '父子',
                address: '天上人间158号'
            })
            stud01.set('guardian', guardian_01);
            guardian_01.set('me', person_parent_01);
            guardian_01.set('guad', stud01);

            let person_urgent_01 = this.store.createRecord('bmperson', {
                id: 'i am stud urgent 01',
                icon: '../images/stud-normal.png',
                name: '王锤子妈',
                nickname: '为什么紧急联系人需要昵称',
                age: 34,
                gender: 1,
                contact: '13720200856',
                wechat: '',
                register_date: new Date(),
            })
            let urgent_01 = this.store.createRecord('bmurgent', {
                id: 'i am stud urgent 01',
                rs: '母子',
                address: '天上人间158号'
            })
            stud01.set('urgent', urgent_01);
            urgent_01.set('me', person_urgent_01);
            urgent_01.set('urg', stud01);

            let dob_stud_02 = this.store.createRecord('date-format', {
                id: 'i am stud person dob 02',
                year: 2017,
                month: 8,
                day: 1
            })
            let person_stud_02 = this.store.createRecord('bmperson', {
                id: 'i am stud person 02',
                icon: '../images/stud-normal.png',
                name: '莫小贝',
                nickname: '贝子',
                age: 3,
                gender: 0,
                contact: '',
                register_date: new Date(),
            })
            person_stud_02.set('dob', dob_stud_02);
            let stud02 = this.store.createRecord('bmstud', {
                id: 'i am stud 02',
                school: '霍格沃茨' 
            })
            stud02.set('me', person_stud_02);

            let person_parent_02 = this.store.createRecord('bmperson', {
                id: 'i am stud parent 02',
                icon: '../images/stud-normal.png',
                name: '莫大老先生',
                nickname: '潇湘夜雨',
                age: 34,
                gender: 1,
                contact: '江湖人物不用电话',
                wechat: '',
                register_date: new Date(),
            })
            let guardian_02 = this.store.createRecord('bmguardian', {
                id: 'i am stud guardian 02',
                rs: '母子',
                address: '衡山剑派001号'
            })
            stud02.set('guardian', guardian_02);
            guardian_02.set('me', person_parent_02);
            guardian_02.set('guad', stud02);

            let person_urgent_02 = this.store.createRecord('bmperson', {
                id: 'i am stud urgent 02',
                icon: '../images/stud-normal.png',
                name: '衡山的臭尼姑',
                nickname: '为什么紧急联系人需要昵称',
                age: 34,
                gender: 1,
                contact: '13720200856',
                wechat: '',
                register_date: new Date(),
            })
            let urgent_02 = this.store.createRecord('bmurgent', {
                id: 'i am stud urgent 02',
                rs: '母子',
                address: '天上人间158号'
            })
            stud02.set('urgent', urgent_02);
            urgent_02.set('me', person_urgent_02);
            urgent_02.set('urg', stud02);
        }
    }
});
