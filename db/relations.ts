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
    examDetailsTable: {
        candidate: r.many.candidateTable({
            from: r.examDetailsTable.id,
            to: r.candidateTable.exam_id,
        }),
    },
    candidateTable: {
        examDetails: r.one.examDetailsTable({
            from: r.candidateTable.exam_id,
            to: r.examDetailsTable.id,
        }),
    },
}));