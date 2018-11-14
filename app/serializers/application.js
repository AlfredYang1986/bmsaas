import PharbersSerializer from 'pharbers-emberbasis-library/serializers/phserializer';
import { dasherize, classify } from '@ember/string';

/**
 * 所有的Serializer都要继承phserializer
 * 数据有特殊需求直接在normalizeResponse自己修改
 */

export default PharbersSerializer.extend({
    keyForAttribute(key) {
		return key
	},
	keyForRelationship(key) {
		return classify(key);
	},
    payloadKeyFromModelName(modelName) {
		return classify(modelName);//capitalize(camelize(modelName))
	},
	modelNameFromPayloadKey(modelName) {
		return dasherize(modelName);//dasherize(modelName);
	}
});
