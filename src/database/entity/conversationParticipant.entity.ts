import { PrimaryColumn, Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Conversation } from './conversation.entity';

@Entity()
export class ConversationParticipant {
  @PrimaryColumn()
  conversationId: string;

  @PrimaryColumn()
  userId: string;

  @ManyToOne(() => Conversation)
  conversation: Conversation;

  @ManyToOne(() => User)
  user: User;
}

// currently, the participant can action full role of conversation
// but in the future, the participant can only action role of conversation
// so we need to add a role column to the conversationParticipant table
// and the role can be admin, member
// and the admin can do anything with the conversation
// the member can only send message to the conversation
