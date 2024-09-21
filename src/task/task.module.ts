import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import {
  TaskStatus as PrismaTaskStatus,
  Priority as PrismaPriority,
} from '@prisma/client';

@ObjectType()
export class Task {
  @Field(() => Int)
  task_id: number;

  @Field()
  task_title: string;

  @Field({ nullable: true })
  task_description?: string;

  @Field(() => PrismaTaskStatus)
  task_status: PrismaTaskStatus;

  @Field(() => PrismaPriority)
  priority: PrismaPriority;

  @Field(() => Int)
  assigned_to: number;

  @Field({ nullable: true })
  deadline?: Date;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}

// Register the enums with GraphQL
registerEnumType(PrismaTaskStatus, {
  name: 'TaskStatus',
  description: 'The status of a task',
});

registerEnumType(PrismaPriority, {
  name: 'Priority',
  description: 'The priority level of a task',
});
