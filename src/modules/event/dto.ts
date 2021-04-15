import { IsNumberString, IsOptional } from 'class-validator';

export class FindEventsQueryDto {
  @IsNumberString()
  @IsOptional()
  sportId: string;
}
