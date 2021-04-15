import { IsNumberString } from 'class-validator';

export class FindEventsQueryDto {
  @IsNumberString()
  sportId: string;
}
