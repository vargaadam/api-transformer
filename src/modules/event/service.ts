import EventsApi from '../../api/events-api';
import { NotFoundException } from '../../exceptions';
import { ELanguages } from '../../interfaces';
import { parseResponseBody } from '../../utils/api-response-parser';

import { IEvent, IEventResult } from './interface';

export default class EventService {
  eventsApi: EventsApi;

  constructor(eventsApi: EventsApi) {
    this.eventsApi = eventsApi;
  }

  async getAllEvents(sportId?: number, lang?: ELanguages): Promise<IEventResult> {
    const { result } = await this.eventsApi.getRawEvents(lang);

    let events: IEvent[] = parseResponseBody(result.sports, ['comp', 'events'], ['markets']);

    if (sportId) {
      events = events.filter((event) => event.sport_id === sportId);

      if (events.length < 1) {
        throw new NotFoundException(`There are no events for the given sportId`);
      }
    }

    events = events.sort((a, b) => {
      return a.pos - b.pos;
    });

    return {
      total_number_of_events: events.length,
      events
    };
  }

  async getEventById(eventId: number, lang?: ELanguages): Promise<IEvent> {
    const { result } = await this.eventsApi.getRawEvents(lang);

    const events = parseResponseBody(result.sports, ['comp', 'events'], ['markets']);

    const foundEvent = events.find((event) => event.id === eventId);

    if (!foundEvent) {
      throw new NotFoundException(`There is no event with the given id`);
    }

    return foundEvent;
  }
}
