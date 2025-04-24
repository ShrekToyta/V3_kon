import { AbstractComponent } from '../framework/abstract-component.js'

export default class TripFilterView extends AbstractComponent {
	#onFilterChange

	constructor({ onFilterChange }) {
		super()
		this.#onFilterChange = onFilterChange

		this.element
			.querySelector('#date-filter')
			.addEventListener('change', this.#handleFilterChange)
		this.element
			.querySelector('#completed-filter')
			.addEventListener('change', this.#handleFilterChange)
	}

	get template() {
		return `
      <div class="trip-filter">
        <label for="date-filter">Фильтр по дате:</label>
        <input type="date" id="date-filter" />

        <label>
          <input type="checkbox" id="completed-filter" />
          Показывать только завершенные поездки
        </label>
      </div>
    `
	}

	#handleFilterChange = () => {
		const dateValue = this.element.querySelector('#date-filter').value
		const showCompletedOnly =
			this.element.querySelector('#completed-filter').checked

		this.#onFilterChange({
			date: dateValue,
			completedOnly: showCompletedOnly,
		})
	}
}
