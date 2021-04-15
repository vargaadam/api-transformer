import { IOrder } from '../../interfaces';

export interface IEvent extends IOrder {
  id: number;
  event_type: string;
  event_path_id: number;
  sport_id: number;
  desc: string;
  oppADesc: string;
  oppAId: number;
  oppBDesc: string;
  oppBId: number;
  american: boolean;
  inPlay: boolean;
  time: number;
  hasUpcomingEvents: boolean;
  metadata: any;
  has_stream: boolean;
  scoreboard: any;
}

export interface IEventResult {
  total_number_of_events: number;
  events: IEvent[];
}
