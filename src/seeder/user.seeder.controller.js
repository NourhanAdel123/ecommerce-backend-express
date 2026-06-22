import { userModel } from "../DB/Models/user.model.js";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

export const seedUsers = async (req, res, next) => {
  try {
    const count = 5000;
    const users = [];
    const defaultPassword = "1234";
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    for (let i = 0; i < count; i++) {
      const uniqueEmail = `user${i}_${Date.now()}@${faker.internet.domainName()}`;
      users.push({
        username: faker.person.fullName(),
        email: uniqueEmail,
        password: hashedPassword,
        role: "User",
      });
    }

    const batchSize = 1000;
    for (let i = 0; i < users.length; i += batchSize) {
      const batch = users.slice(i, i + batchSize);
      await userModel.collection.insertMany(batch);
    }

    res.status(201).json({ message: "successfully seeded 5000 user", count });
  } catch (error) {
    next(error);
  }
};
