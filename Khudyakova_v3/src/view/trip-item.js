import { BaseComponent } from '../framework/abstract-component.js';

export class TripCard extends BaseComponent {
  constructor(tripData, handlers) {
    super();
    this.data = tripData;
    this.handleRemove = handlers.onRemove;
    this.handleUpdate = handlers.onUpdate;
    
    this._setupEventListeners();
  }

  _setupEventListeners() {
    this.getElement()
      .querySelector('.card__remove-btn')
      .addEventListener('click', () => this.handleRemove(this.data.id));
      
    this.getElement()
      .querySelector('.card__edit-btn')
      .addEventListener('click', () => this.handleUpdate(this.data));
  }

  createTemplate() {
    const { destination, date, notes } = this.data;
    
    return `
      <article class="trip-card">
        <header class="card__header">
          <h3 class="card__title">${destination}</h3>
          <time class="card__date">${new Date(date).toLocaleDateString('ru-RU')}</time>
        </header>
        
        <div class="card__content">
          <p class="card__notes">${notes || 'Без заметок'}</p>
        </div>
        
        <footer class="card__footer">
          <button type="button" class="card__edit-btn">Изменить</button>
          <button type="button" class="card__remove-btn">Удалить</button>
        </footer>
      </article>
    `;
  }
}