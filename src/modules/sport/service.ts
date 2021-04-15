import EventsApi from '../../api/events-api';
import { ISportResult } from './interface';

export default class SportService {
  eventsApi: EventsApi;

  constructor(eventsApi: EventsApi) {
    this.eventsApi = eventsApi;
  }

  async getAllSports(): Promise<ISportResult> {
    const { result } = await this.eventsApi.getRawEvents();

    const sports = result.sports.map((rawEvent) => {
      const { comp, ...sport } = rawEvent;

      return sport;
    });

    return {
      total_number_of_events: result.total_number_of_events,
      sports
    };
  }
}
