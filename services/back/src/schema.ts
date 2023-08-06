import {
  char,
  date,
  integer,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: serial("id").primaryKey(),
  uid: char("uid", { length: 16 }).unique().notNull(), // a crypto random number to use for anonymous verifiable credential
  createdAt: date("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: date("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export const emailTable = pgTable("email", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 254 }).unique().notNull(),
  userId: integer("user_id")
    .references(() => userTable.id)
    .notNull(),
});

export const deviceTable = pgTable("device", {
  id: serial("id").primaryKey(),
  didWrite: varchar("did_write", { length: 1000 }).unique().notNull(), // TODO: make sure of length
  didExchange: varchar("did_exchange", { length: 1000 }).unique().notNull(), // TODO: make sure of length
  userId: integer("user_id")
    .references(() => userTable.id)
    .notNull(),
});

// export const userHasManyEmails = relations(user, ({ many }) => ({
//   emails: many(email)
// }));

// export const emailHasOneUser = relations(email, ({one}) => ({
//   user: one(user, {
//     fields: [email.userId],
//     references: [user.id],
//   })

// }));