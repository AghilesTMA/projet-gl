import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  date,
  serial,
  pgEnum,
  real,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

const roleEnum = pgEnum("role", ["store", "user"]);

export const clintsTable = pgTable("clients", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey()
    .notNull(),
  userName: varchar({ length: 255 }).notNull().unique(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: text().notNull(),
  image: text(),
  role: roleEnum("role").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const storeTable = pgTable("stores", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  clientId: uuid("clientId")
    .notNull()
    .references(() => clintsTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  storeTitle: varchar({ length: 255 }).notNull(),
  address: text().notNull(),
  isSponsored: boolean(),
  wilaya: text().notNull(),
  comune: text().notNull(),
  lan: real().notNull(),
  lat: real().notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const userTable = pgTable("users", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  clientId: uuid("clientId")
    .notNull()
    .references(() => clintsTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  fullName: varchar({ length: 255 }).notNull(),
  dateOfBirth: date(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const announcementTable = pgTable("announcements", {
  id: serial().primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  image: text().notNull(),
  role: roleEnum("role").notNull(),
  price: real().notNull(),
  lat: real().notNull(),
  lan: real().notNull(),
  wilaya: varchar({ length: 255 }).notNull(),
  comune: varchar({ length: 255 }).notNull(),
  owner: uuid("owner")
    .notNull()
    .references(() => clintsTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  dimensions: integer(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const appointmentTable = pgTable("appointment", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  date: date(),
  userId: uuid("userId")
    .notNull()
    .references(() => clintsTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  announcementId: integer()
    .notNull()
    .references(() => announcementTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const adsTable = pgTable("ads", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  storeId: uuid("storeId")
    .notNull()
    .references(() => storeTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  img: text().notNull(),
  title: text().notNull(),
  description: text().notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const chatTable = pgTable("chats", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  firstUser: uuid("firstUser")
    .notNull()
    .references(() => clintsTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  secondUser: uuid("secondUser")
    .notNull()
    .references(() => clintsTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  img: text().notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const messagesTable = pgTable("messages", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  sender: uuid("sender")
    .notNull()
    .references(() => clintsTable.id),
  chatId: uuid("chatId")
    .notNull()
    .references(() => chatTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  content: text().notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const notificationsTable = pgTable("notifications", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  clientId: uuid("clientId")
    .notNull()
    .references(() => clintsTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  announcementId: integer()
    .notNull()
    .references(() => announcementTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const filtersTable = pgTable("filters", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  clientId: uuid("clientId")
    .notNull()
    .references(() => clintsTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  wilaya: text(),
  comune: text(),
  maxPrice: real().default(0),
  minPrice: real().default(0),
  maxDimensions: integer().default(0),
  minDimensions: integer().default(0),
  role: roleEnum("role").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const clintsRelations = relations(clintsTable, ({ one, many }) => ({
  stores: many(storeTable),
  users: many(userTable),
  announcements: many(announcementTable),
  appointments: many(appointmentTable),
  notifications: many(notificationsTable),
  chatsFirstUser: many(chatTable),
  chatsSecondUser: many(chatTable),
  messages: many(messagesTable),
  filters: many(filtersTable),
}));

export const storeRelations = relations(storeTable, ({ one, many }) => ({
  client: one(clintsTable),
  ads: many(adsTable),
}));

export const userRelations = relations(userTable, ({ one }) => ({
  client: one(clintsTable),
}));

export const announcementRelations = relations(
  announcementTable,
  ({ one, many }) => ({
    owner: one(clintsTable),
    appointments: many(appointmentTable),
    notifications: many(notificationsTable),
  })
);

export const appointmentRelations = relations(appointmentTable, ({ one }) => ({
  user: one(clintsTable),
  announcement: one(announcementTable),
}));

export const adsRelations = relations(adsTable, ({ one }) => ({
  store: one(storeTable),
}));

export const chatRelations = relations(chatTable, ({ one, many }) => ({
  firstUser: one(clintsTable),
  secondUser: one(clintsTable),
  messages: many(messagesTable),
}));

export const messagesRelations = relations(messagesTable, ({ one }) => ({
  sender: one(clintsTable),
  chat: one(chatTable),
}));

export const notificationsRelations = relations(
  notificationsTable,
  ({ one }) => ({
    client: one(clintsTable),
    announcement: one(announcementTable),
  })
);

export type selectClient = typeof clintsTable.$inferSelect;
export type selectUser = typeof userTable.$inferSelect;
export type selectStore = typeof storeTable.$inferSelect;

export type insertClient = typeof clintsTable.$inferInsert;
export type insertUser = typeof userTable.$inferInsert;
export type insertStore = typeof storeTable.$inferInsert;