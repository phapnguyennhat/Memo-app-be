import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ActionRequestFriend } from 'src/enum/actionRequestFriend.enum';

export class ActionFriendRequestDto {
  @IsEnum(ActionRequestFriend)
  @IsNotEmpty()
  @ApiProperty({
    description: 'The action to perform',
    enum: ActionRequestFriend,
  })
  action: ActionRequestFriend;
}
