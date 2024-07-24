import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

export const get = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("worshipService").collect()
    }
})

export const create = mutation({
    args: {
        date: v.string(),
        time: v.string(),
        location: v.string(),
        roles: v.optional(
            v.array(
              v.object({
                roleName: v.id("roles"),
                members: v.array(v.id("users"))
              })
            )
          ),
        order: v.array(
            v.object({
              orderSectionName: v.string(),
              orderSectionContent: v.array(
                v.object({
                  itemName: v.string(),
                  itemSubtitle: v.string(),
                  itemDuration: v.string()
                })
              )
            }))
    },
    handler: async({db}, args)=>{
        await db.insert("worshipService", args)
    }
})