import TripItemView from '../view/trip-item.js'
import TripListView from '../view/trip-lists.js'
import TripFormView from '../view/trip-form.js'
import TripFilterView from '../view/trip-filter.js'
import { render } from '../framework/render.js'
import TripEditFormView from '../view/trip-edit-form.js'

export default class TripPresenter {
	#tripModel
	#container
	#tripListComponent

	constructor({ container, tripModel }) {
		this.#tripModel = tripModel
		this.#container = container
	}

	init() {
		const formComponent = new TripFormView({
			onSubmit: trip => {
				this.#tripModel.addTrip(trip)
				this.#renderTrips()
			},
		})
		render(formComponent, document.querySelector('.trip-form'))

		const filterComponent = new TripFilterView({
			onFilterChange: filterData => {
				this.#tripModel.setFilter(filterData)
				this.#renderTrips()
			},
		})
		render(filterComponent, document.querySelector('.trip-filter'))

		this.#tripListComponent = new TripListView()
		render(this.#tripListComponent, this.#container)

		this.#renderTrips()
	}

	#renderTrips() {
		this.#tripListComponent.listElement.innerHTML = ''

		this.#tripModel.getFilteredTrips().forEach(trip => {
			const tripView = new TripItemView(trip, {
				onDelete: id => {
					this.#tripModel.deleteTrip(id)
					this.#renderTrips()
				},
				onEdit: () => {
					const editForm = new TripEditFormView(trip, {
						onSubmit: updatedTrip => {
							this.#tripModel.updateTrip(updatedTrip)
							this.#renderTrips()
						},
					})

					this.#tripListComponent.listElement.replaceChild(
						editForm.element,
						tripView.element
					)
				},
			})

			render(tripView, this.#tripListComponent.listElement)
		})
	}
}
