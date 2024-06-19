import { query } from "./_generated/server"
import { v } from "convex/values"

export const get = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("teamEvent").collect()
    }
})

// export const getTeamById = query({
//     args: {teamId: v.id("teams")},
//     handler: async (ctx, args) => {
//         return await ctx.db.query("teamEvent").filter(q=>q.).collect()
//     }
// })