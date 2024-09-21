import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserResolver } from './user.resolver';
import { Module } from '@nestjs/common';
import { UserRole as PrismaUserRole } from '@prisma/client';

@Module({
  providers: [PrismaService, UserResolver],
})
export class UserModule {}

@ObjectType()
export class User {
  @Field(() => ID)
  user_id: number;

  @Field()
  user_name: string;

  @Field()
  user_email: string;

  @Field(() => PrismaUserRole)
  user_role: PrismaUserRole;

  @Field()
  user_password: string;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;
}

// Register the enum with GraphQL
registerEnumType(PrismaUserRole, {
  name: 'UserRole', // This name will be used in the GraphQL schema
  description: 'The roles a user can have', // Optional description
});
