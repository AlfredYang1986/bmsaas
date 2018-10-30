import DS from 'ember-data';
import { dateFormat } from '../util/date';
export default DS.Transform.extend({
  deserialize(serialized) {
    return dateFormat(serialized, 'yyyy-MM-dd');
  },

  serialize(deserialized) {
    return deserialized;
  }
});