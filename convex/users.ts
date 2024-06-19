import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

export const get = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("users").collect()
    }
})

export const getUserByName = query({
    args: { name: v.string()},
    handler: async (ctx, args) => {
        return await ctx.db.query("users").filter(q=>q.eq(q.field("firstName"), args.name)).collect()
    }
})


