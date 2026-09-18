// in this file we have to write relation
import { defineRelations } from "drizzle-orm";
import * as schema from "./schema/export";

export const relations = defineRelations(schema, (r) => ({
    usersTable: {
        posts: r.many.postTable({
            from: r.usersTable.id,
            to: r.postTable.userId,
        }),
    },
    postTable: {
        user: r.one.usersTable({
            from: r.postTable.userId,
            to: r.usersTable.id,
        }),
    },
}));