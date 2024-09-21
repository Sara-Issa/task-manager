import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { User } from './user.module';
import { CreateUserInput, UpdateUserInput } from './input/user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthGuard } from 'src/Auth/AuthGuard';
import { UseGuards } from '@nestjs/common';

@Resolver(User)
export class UserResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [User])
  @UseGuards(AuthGuard)
  async getAllUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  @Query(() => User, { nullable: true })
  @UseGuards(AuthGuard)
  async getUserById(
    @Args('user_id', { type: () => Int }) user_id: number,
  ): Promise<User> {
    return this.prisma.user.findUnique({ where: { user_id: user_id } });
  }

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.prisma.user.create({ data: createUserInput });
  }

  @Mutation(() => User)
  async updateUser(
    @Args('user_id', { type: () => Int }) user_id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.prisma.user.update({
      where: { user_id: user_id },
      data: updateUserInput,
    });
  }

  @Mutation(() => User)
  async deleteUser(
    @Args('user_id', { type: () => Int }) user_id: number,
  ): Promise<User> {
    return this.prisma.user.delete({ where: { user_id: user_id } });
  }
}
