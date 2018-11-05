import Component from '@ember/component';

export default Component.extend({
    tagName: 'option',
    positionalParams: ['optItem'],
    attributeBindings: ['optItem:value'],
});