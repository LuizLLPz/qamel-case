import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Post as PostEntity } from "../entities/Post";
import { client } from '../../utils/PrismaClient';

@Resolver()
export class Post {

    @Query(() => [PostEntity])
    async getAllPosts() {
        const res = client.post.findMany();
        return res;
    }


    @Mutation(() => String)
    async generatedPost(
        @Arg('title') title: string,
        @Arg('text') text: string,
    ) {
        try {
            await client.post.create({
            data: {
                title,
                text,
                userID: 1,
                createdAt: new Date(),
            },
            });
            return 'OK'
        } catch (error) {
            console.log(error);
            return '500 - Internal error when creating post, contact the administrator';
        }
       
    }

}