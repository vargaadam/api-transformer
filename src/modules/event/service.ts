import EventsApi from '../../api/events-api';
import { parseResponseBody } from '../../utils/api-response-parser';

import { IEventResult } from './interface';

export default class EventService {
  eventsApi: EventsApi;

  constructor(eventsApi: EventsApi) {
    this.eventsApi = eventsApi;
  }

  async getAllEvents(): Promise<IEventResult> {
    const { result } = await this.eventsApi.getRawEvents();

    const events = parseResponseBody(result.sports, ['comp', 'events']);

    return {
      total_number_of_events: result.total_number_of_events,
      events
    };
  }
}
