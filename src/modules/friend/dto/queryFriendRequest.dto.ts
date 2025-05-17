import { IsEnum, IsOptional } from 'class-validator';
import { QueryPaginationDto } from 'src/common/queryPagination.dto';

export enum EFriendRequestCollection {
  REQUESTSENT = 'requests-sent',
  REQUESTRECEIVED = 'requests-received',
}

export class QueryFriendRequestDto extends QueryPaginationDto {
  @IsOptional()
  @IsEnum(EFriendRequestCollection)
  collection: EFriendRequestCollection;
}
