import { AbstractComponent } from '../framework/abstract-component.js'

export default class TripListView extends AbstractComponent {
	get template() {
		return `<ul class="trip-list"></ul>`
	}

	get listElement() {
		return this.element
	}
}
