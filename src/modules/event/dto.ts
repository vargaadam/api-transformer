import { IsNumberString, IsOptional } from 'class-validator';

export class GetEventsQueryDto {
  @IsNumberString()
  @IsOptional()
  sportId: string;
}

export class GetEventByIdParamDto {
  @IsNumberString()
  eventId: string;
}
