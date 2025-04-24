import { AbstractComponent } from '../framework/abstract-component.js'

export default class TripFormView extends AbstractComponent {
	#onSubmit

	constructor({ onSubmit }) {
		super()
		this.#onSubmit = onSubmit

		this.element
			.querySelector('form')
			.addEventListener('submit', this.#handleSubmit)
	}

	get template() {
		return `
      <div class="trip-form">
        <h2>Добавить новую поездку</h2>
        <form id="trip-form">
          <label for="trip-destination">Путешествие:</label>
          <input type="text" id="trip-destination" placeholder="Destination" required />

          <label for="trip-date">Дата:</label>
          <input type="date" id="trip-date" required />

          <label for="trip-notes">Заметки:</label>
          <textarea id="trip-notes" placeholder="Notes" rows="3"></textarea>

          <fieldset>
            <legend>Статус поездки:</legend>
            <label><input type="radio" name="trip-status" value="Planned" required /> Запланировано</label>
            <label><input type="radio" name="trip-status" value="Completed" required /> Выполнено</label>
          </fieldset>

          <button type="submit">Добавить поездку</button>
        </form>
      </div>
    `
	}

	#handleSubmit = evt => {
		evt.preventDefault()

		const form = this.element.querySelector('form')

		const trip = {
			id: crypto.randomUUID(),
			place: form.querySelector('#trip-destination').value.trim(),
			date: form.querySelector('#trip-date').value,
			note: form.querySelector('#trip-notes').value.trim(),
			status: form.querySelector('input[name="trip-status"]:checked').value,
		}

		this.#onSubmit(trip)
		form.reset()
	}
}
