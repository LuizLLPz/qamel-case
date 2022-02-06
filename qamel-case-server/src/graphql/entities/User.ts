import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class User {
  @Field()
  name: String;

  @Field()
  email: String;

}