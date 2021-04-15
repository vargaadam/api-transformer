import EventsApi from '../../api/events-api';
import { parseResponseBody } from '../../utils/api-response-parser';

import { IEventResult } from './interface';

export default class EventService {
  eventsApi: EventsApi;

  constructor(eventsApi: EventsApi) {
    this.eventsApi = eventsApi;
  }

  async getAllEvents(sportId?: number): Promise<IEventResult> {
    const { result } = await this.eventsApi.getRawEvents();

    let events = parseResponseBody(result.sports, ['comp', 'events']);

    if (sportId) {
      events = events.filter((event) => event.sport_id === sportId);
    }

    return {
      total_number_of_events: events.length,
      events
    };
  }
}