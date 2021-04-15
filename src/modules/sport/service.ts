import EventsApi from '../../api/events-api';
import { ELanguages } from '../../interfaces';
import { ISport } from './interface';

export default class SportService {
  eventsApi: EventsApi;

  constructor(eventsApi: EventsApi) {
    this.eventsApi = eventsApi;
  }

  async getAllSports(lang?: ELanguages): Promise<ISport[]> {
    const { result } = await this.eventsApi.getRawEvents(lang);

    return result.sports.map((rawEvent) => {
      const { comp, ...sport } = rawEvent;

      return sport;
    });
  }
}
