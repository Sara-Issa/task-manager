import { InputType, Field } from '@nestjs/graphql';
import { UserRole as PrismaUserRole } from '@prisma/client';

@InputType()
export class CreateUserInput {
  @Field()
  user_name: string;

  @Field()
  user_email: string;

  @Field(() => PrismaUserRole)
  user_role: PrismaUserRole;

  @Field()
  user_password: string;
}

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  user_name?: string;

  @Field({ nullable: true })
  user_email?: string;

  @Field(() => PrismaUserRole, { nullable: true })
  user_role?: PrismaUserRole;

  @Field({ nullable: true })
  user_password?: string;
}
