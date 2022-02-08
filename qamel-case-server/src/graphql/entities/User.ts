import { ObjectType, Field } from 'type-graphql';


@ObjectType()
export class User {

  @Field()
  id: Number

  @Field()
  name: String;

  @Field()
  email: String;

  @Field()
  password: String;

}