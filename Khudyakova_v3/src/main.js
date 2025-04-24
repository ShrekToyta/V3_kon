import TripPresenter from './presenter/trip-presenter.js'
import TripModel from './model/trip-model.js'

const appContainer = document.querySelector('.trip-list')
const tripModel = new TripModel()

const presenter = new TripPresenter({
	container: appContainer,
	tripModel,
})

presenter.init()
