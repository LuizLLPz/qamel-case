import { ObjectType, Field } from 'type-graphql';


@ObjectType()
export class User {

  @Field()
  id: number

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;

}