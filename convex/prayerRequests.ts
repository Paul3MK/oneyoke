import { mutation } from "./_generated/server"
import { v } from "convex/values"

export const create = mutation({
    args: {
        firstName: v.string(),
        lastName: v.string(),
        details: v.string(),
        category: v.union(
            v.literal("healing"),
            v.literal("health"),
            v.literal("marriage"),
            v.literal("deliverance"),
            v.literal("salvation"),
            v.literal("finance"),
            v.literal("other")
        ),
        emailAddress: v.string(),
        phoneNumber: v.string(),
    },
    handler: async ({ db }, args) => {
        await db.insert("prayerRequests", args)
    }
})  