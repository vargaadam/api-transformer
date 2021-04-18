import EventsApi from '../../api/events-api';
import { ELanguages } from '../../interfaces';
import { ISport } from './interface';

export default class SportService {
  eventsApi: EventsApi;

  constructor(eventsApi: EventsApi) {
    this.eventsApi = eventsApi;
  }

  async getAllSports(lang?: ELanguages): Promise<ISport[]> {
    let sports = await this.findAllSports(lang);

    sports = sports.sort((a, b) => {
      return a.pos - b.pos;
    });

    return sports;
  }

  async getAllSportsInAllLanguages(): Promise<ISport[]> {
    let foundSports = (
      await Promise.all(Object.values(ELanguages).map((language) => this.findAllSports(language)))
    ).flat();

    foundSports = foundSports.sort((a, b) => {
      return a.pos - b.pos;
    });

    return foundSports;
  }

  private async findAllSports(lang?: ELanguages): Promise<ISport[]> {
    const { result } = await this.eventsApi.getRawEvents(lang);

    return result.sports.map((rawEvent) => {
      const { comp, ...sport } = rawEvent;

      return sport;
    });
  }
}
