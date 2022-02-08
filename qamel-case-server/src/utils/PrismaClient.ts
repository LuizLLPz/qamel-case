import { PrismaClient } from "@prisma/client";

const clientMaker = () => {
	const prisma = new PrismaClient();
	return prisma;
}


export const client = clientMaker();

