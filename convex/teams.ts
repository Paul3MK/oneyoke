import { query } from "./_generated/server"
import { v } from "convex/values"

export const get = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("teams").collect()
    }
})

export const getUserById = query({
    args: {
        user: v.string()
    },
    handler: async (ctx, args) => {
        return await ctx.db.query("users")
            .filter(q => q.eq(q.field("_id"), args.user))
            .collect()
    }

})

export const getTeamsForUser = query({
    args: {
        user: v.string()
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.query("users")
        .filter(q => q.eq(q.field("_id"), args.user))
        .collect()

        console.log(user)

        let userTeams = user[0].teams

        let teams: any = []

        const allTeams = await ctx.db.query("teams").collect()
        userTeams?.forEach(async (userTeam) => {
            console.log(`this is userTeam:${userTeam}`)
            const userTeamData = allTeams.filter(team=> team._id == userTeam)
            teams.push(...userTeamData)
        })

        console.log(teams)

        return teams
    }
})



