import Component from '@ember/component';

export default Component.extend({
    positionalParams: ['yard', 'canChecked'],
    canChecked: false,
    checked: false,
    click() {
        if (this.canChecked) {
            if (this.checked) {
                this.checked = false;
            } else {
                this.checked = true;
            }

            this.onYardCardClicked(this.yard.id, checked);
        } else {
            this.onYardCardClicked(this.yard.id);
        }
    },
    classNameBindings: [
        'checked:selected_tech',
    ],
});
