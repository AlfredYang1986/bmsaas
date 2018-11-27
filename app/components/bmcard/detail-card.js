import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    positionalParams: ['card'],
    isSetData: computed(function(){
        return this.card != null;
    })
});
