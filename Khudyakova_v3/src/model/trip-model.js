import { trips as mockTrips } from '../mock/trips.js'

export default class TripModel {
	#trips = [...mockTrips]
	#filter = { date: '', completedOnly: false }

	get trips() {
		return this.#trips
	}

	setFilter({ date, completedOnly }) {
		this.#filter = { date, completedOnly }
	}

	getFilteredTrips() {
		return this.#trips.filter(trip => {
			const matchDate = this.#filter.date
				? trip.date === this.#filter.date
				: true

			const matchStatus = this.#filter.completedOnly
				? trip.status === 'completed'
				: true

			return matchDate && matchStatus
		})
	}

	addTrip(trip) {
		this.#trips.push(trip)
	}

	deleteTrip(id) {
		this.#trips = this.#trips.filter(trip => trip.id !== id)
	}

	updateTrip(updatedTrip) {
		this.#trips = this.#trips.map(trip =>
			trip.id === updatedTrip.id ? updatedTrip : trip
		)
	}
}
