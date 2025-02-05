const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const main = async () => {
  // Write data in database
  /* await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@prisma.io",
      posts: {
        create: { title: "Hello world" },
      },
      profile: {
        create: {
          bio: "I like turtles",
        },
      },
    },
  });

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });

  console.dir(allUsers, { depth: null }); */
  // Update post
  /*  const post = await prisma.post.update({
    where: { id: 1 },
    data: { published: true },
  });

  console.log("post:", post); */
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });

  console.dir(allUsers, { depth: null });
};

main();
// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     await prisma.$disconnect();
//     process.exit(1);
//   });
