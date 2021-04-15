import EventsApi from '../../api/events-api';
import { ISport } from './interface';

export default class SportService {
  eventsApi: EventsApi;

  constructor(eventsApi: EventsApi) {
    this.eventsApi = eventsApi;
  }

  async getAllSports(): Promise<ISport[]> {
    const { result } = await this.eventsApi.getRawEvents();

    return result.sports.map((rawEvent) => {
      const { comp, ...sport } = rawEvent;

      return sport;
    });
  }
}
