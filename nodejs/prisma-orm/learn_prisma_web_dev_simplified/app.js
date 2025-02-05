const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB

const main = async () => {
  // Create user
  /* await prisma.user.deleteMany();
  const user = await prisma.user.create({
    data: {
      name: "Dale",
      email: "dgribble@gamil.com",
      age: 40,
      userPreference: {
        create: {
          emailUpdates: true,
        },
      },
    },
    select: {
      name: true,
      userPreference: {
        select: {
          id: true,
        },
      },
    },
  });
  console.log("user:", user); */
  // Create many users
  /* await prisma.user.deleteMany();
  const users = await prisma.user.createMany({
    data: [
      {
        name: "Dale",
        email: "dgribble@gamil.com",
        age: 40,
      },
      {
        name: "Bill",
        email: "mrbill@gamil.com",
        age: 41,
      },
    ],
  });
  console.log("users:", users); */
  // Find unique
  /*  const user = await prisma.user.findUnique({
    where: {
      age_name: {
        age: 40,
        name: "Dale",
      },
    },
  });
  console.log("user:", user); */
  // const users = await prisma.user.findMany();
  // console.log("users:", users);
  // await prisma.user.deleteMany();
  //
  /* await prisma.user.createMany({
    data: [
      {
        name: "Bobby",
        email: "bman1@gamil.com",
        age: 15,
      },
      {
        name: "Luanne",
        email: "hairdresser_lu1@gamil.com",
        age: 31,
      },
    ],
  }); */
  /* const user = await prisma.user.findMany({
    where: {
      name: "Bobby",
    },
    orderBy: {
      age: "desc",
    },
    // take: 2,
    // skip: 1,
    // distinct: ["name", "age"],
  });
  console.log("user:", user); */
  const user = await prisma.user.update({
    where: {
      email: "bman1@gamil.com",
    },
    data: {
      email: "bhill@gmail.com",
    },
  });
  console.log("user:", user);
};

main()
  .catch((e) => {
    console.log(e.message);
  })
  .finally(async () => {
    prisma.$disconnect();
  });
