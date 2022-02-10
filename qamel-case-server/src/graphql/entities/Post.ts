import { ObjectType, Field } from "type-graphql";
import { User } from "../entities/User";

@ObjectType()
export class Post {
  @Field()
  title: string;

  @Field()
  text: string;

  @Field()
  createdAt: Date;

  @Field()
  user : User;

  @Field()
  userId: number;
}
