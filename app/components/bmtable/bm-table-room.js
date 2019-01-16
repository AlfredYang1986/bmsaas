import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    classNames: ['bm-room-table'],
    positionalParams: ['titles'],
    bm_room_service: service(),
    actions : {
        onClick: function(fieldId) {
            this.sendAction("action", fieldId);
        },
        onEditRoomClick: function (params) {
			this.sendAction("onEditRoomClick", params);
		},
		onDeleteRoomClick: function (params) {
			this.sendAction("onDeleteRoomClick", params);
		},
    }
});
