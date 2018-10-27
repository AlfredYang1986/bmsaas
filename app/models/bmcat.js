import DS from 'ember-data';

// 课程类别
export default DS.Model.extend({
    cat: DS.attr('string'),
    sub: DS.attr('string')
});
