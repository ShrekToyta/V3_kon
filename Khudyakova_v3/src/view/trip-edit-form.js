import { AbstractComponent } from '../framework/abstract-component.js'

export default class TripEditFormView extends AbstractComponent {
	#trip
	#onSubmit

	constructor(trip, { onSubmit }) {
		super()
		this.#trip = trip
		this.#onSubmit = onSubmit
		this.element.addEventListener('submit', this.#handleSubmit)
	}

	get template() {
		const { place, date, note, status } = this.#trip

		return `
      <form class="trip-edit-form">
        <input type="text" name="place" value="${place}" required />
        <input type="date" name="date" value="${date}" required />
        <textarea name="note" rows="2">${note}</textarea>

        <select name="status">
          <option value="Planned" ${
						status === 'planned' ? 'selected' : ''
					}>Запланировано</option>
          <option value="Completed" ${
						status === 'completed' ? 'selected' : ''
					}>Завершено</option>
        </select>

        <button type="submit">Сохранить</button>
      </form>
    `
	}

	#handleSubmit = evt => {
		evt.preventDefault()
		const form = this.element

		const updatedTrip = {
			...this.#trip,
			place: form.place.value.trim(),
			date: form.date.value,
			note: form.note.value.trim(),
			status: form.status.value,
		}

		this.#onSubmit(updatedTrip)
	}
}
