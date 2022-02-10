import { Resolver, Query } from "type-graphql";
import { client } from '../../utils/PrismaClient';

@Resolver()
export class Post {

    @Query()
    async getAllPosts() {
        const res = client.post.findMany();
        return res;
    }
}