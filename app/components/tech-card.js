import Component from '@ember/component';

export default Component.extend({
    positionalParams: ['tech', 'canChecked'],
    canChecked: false,
    checked: false,
    click() {
        if (this.canChecked) {
            if (this.checked) {
                this.set('checked', false);
            } else {
                this.set('checked', true);
            }

            this.onTechCardClicked(this.tech.get('id'), this.checked);
        } else {
            this.onTechCardClicked(this.tech.get('id'));
        }
    },
    classNameBindings: [
        'checked:selected_tech',
    ],
});
