import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

export const get = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("events").collect()
    }
})

export const create = mutation({
    args: {
        date: v.string(),
        description: v.string(),
        details: v.string(),
        endTime: v.string(),
        image: v.string(),
        lead: v.string(),
        location: v.string(),
        name: v.string(),
        startTime: v.string(),
    },
    handler: async({db}, args) => {
        await db.insert("events", args)
    }
})