import { InputType, Field } from 'type-graphql';
@InputType()
export class User {
  @Field()
  name: String;

  @Field()
  email: String;

}