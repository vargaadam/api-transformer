import { IOrder } from '../../interfaces';

export interface ISport extends IOrder {
  id: number;
  epId: number;
  desc: string;
  ne: number;
  eic: number;
  v: boolean;
  mc: boolean;
  ncmc: number;
  nemc: number;
  hasInplayEvents: boolean;
  hasUpcomingEvents: boolean;
}

export interface ISportResult {
  total_number_of_events: number;
  sports: ISport[];
}
