import DS from 'ember-data';

export default DS.Model.extend({
    inputCode: DS.attr(string),
    tt: DS.attr(string)
});