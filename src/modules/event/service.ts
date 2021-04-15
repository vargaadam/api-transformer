import EventsApi from '../../api/events-api';
import { IEventResult } from './interface';

export default class EventService {
  eventsApi: EventsApi;

  constructor(eventsApi: EventsApi) {
    this.eventsApi = eventsApi;
  }
}
