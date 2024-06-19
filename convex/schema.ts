import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Other tables here...

  events: defineTable({
    details: v.string(),
    name: v.string(),
    startTime: v.string(),
    endTime: v.string(),
    date: v.string(),
    image: v.string(),
    lead: v.string(),
    description: v.string(),
    location: v.string()
  }),

  teams: defineTable({
    name: v.string(),
    lead: v.optional(v.id("users")),
    description: v.string(),
    roles: v.array(
      v.object({
        roleName: v.string(),
        roleDescription: v.string()
      }),
    ),
    members: v.optional(v.array(
      v.object({
        usersId: v.id("users"),
        role: v.string()
      })
    )),
    displayImage: v.optional(v.string()),
    seeking: v.optional(v.boolean())
  }),

  teamEvent: defineTable({
    date: v.string(),
    time: v.string(),
    location: v.string(),
    roles: v.optional(
      v.array(
        v.object({
          roleName: v.string(),
          members: v.array(v.string())
        })
      )
    ),
    setList: v.optional(v.array(
      v.object({
        songName: v.string(),
        key: v.string(),
        bpm: v.number()
      })
    )),
    audio: v.optional(v.array(
      v.object({
        audioName: v.string(),
        uri: v.string()
      })
    )),
    teams: v.optional(v.array(v.id("teams")))
  }),

  worshipService: defineTable({
    date: v.string(),
    time: v.string(),
    location: v.string(),
    roles: v.optional(
      v.array(
        v.object({
          roleName: v.id("role"),
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
            itemStart: v.string(),
            itemEnd: v.string()
          })
        )
      })
    ),
    setList: v.array(
      v.object({
        songName: v.string(),
        key: v.string(),
        bpm: v.number()
      })
    ),
    files: v.optional(v.array(
      v.object({
        fileName: v.string(),
        uri: v.string()
      })
    )),
  }),

  worshipSong: defineTable({
    songName: v.string(),
    defaultKey: v.string(),
    defaultBpm: v.string()
  }),

  teamRole: defineTable({
    team: v.id("teams"),
    roleName: v.string(),
    roleDescription: v.string()
  }),

  users: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    teams: v.optional(v.array(v.id('teams'))),
    lead: v.optional(v.array(v.id("teams"))),
    registered_events: v.optional(v.array(v.id("events")))
  }),

  prayerRequests: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    emailAddress: v.string(),
    phoneNumber: v.string(),
    category: v.union(
      v.literal("healing"),
      v.literal("health"),
      v.literal("marriage"),
      v.literal("deliverance"),
      v.literal("salvation"),
      v.literal("finance"),
      v.literal("other")
    ),
    details: v.string()
  })
});           