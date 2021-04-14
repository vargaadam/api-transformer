import EventsApi from '../../api/events-api';
import { ISport } from './interface';

export default class SportService {
  eventsApi: EventsApi;

  constructor(eventsApi: EventsApi) {
    this.eventsApi = eventsApi;
  }

  async getAllSports(): Promise<ISport[]> {
    const rawEvents = await this.eventsApi.getRawEvents();

    return rawEvents.map((rawEvent) => {
      const { comp, ...sport } = rawEvent;

      return sport;
    });
  }
}
