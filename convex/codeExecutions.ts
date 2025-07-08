import { ConvexError, v } from "convex/values"
import { mutation } from "./_generated/server"


export const saveExecution = mutation({
      args: {
            language: v.string(),
            code: v.string(),
            // we could have either one them or both at a time .
            output: v.optional(v.string()),
            error: v.optional(v.string()),
      },
      handler: async (ctx, args) => {
            const identity = await ctx.auth.getUserIdentity();  // as we are using Clerk
            if (!identity) {
                  throw new ConvexError("You must be logged in to save an execution");
            }

            //check pro status
            const user = await ctx.db
                  .query("users")
                  .withIndex("by_user_id")
                  .filter((q) => q.eq(q.field("userId"), identity.subject))
                  .first();

            if (!user?.isPro && args.language !== "javascript") {
                  throw new ConvexError("Pro Subscription is required to use this language");
            }

            await ctx.db.insert("codeExecutions", {
                  ...args,
                  userId: identity.subject,
            });
      }
})