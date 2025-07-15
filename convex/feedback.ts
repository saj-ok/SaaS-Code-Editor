import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


export const getAllFeedback = query({
      handler: async (ctx)=>{
        const feedbacks = await ctx.db
                             .query("feedback")
                             .withIndex("by_rating")
                             .order("desc")
                             .collect();
        return feedbacks;
      }
})

export const createFeedback = mutation({
      args:{
        userRole: v.string(),
        rating: v.number(),
        content: v.string(),
      },
      handler: async (ctx , agrs)=>{
         const identity =  await ctx.auth.getUserIdentity();
         if(!identity){
            throw new Error("You must be logged in to submit feedback");
         }
         const user =  await ctx.db
                                .query("users")
                                .withIndex("by_user_id")
                                .filter((q)=> q.eq(q.field("userId"), identity.subject))
                                .first();
         if(!user){
           throw new Error("User not found");    
         }

         await ctx.db.insert("feedback",{
             userId: user.userId,
             userName: user.name,
             userProfileUrl: identity.pictureUrl || "",
             ...agrs,
         })
      }
})

export const getFeedbackPerUser = query({
      args:{
         userId: v.string(),
      },
     handler: async(ctx , args)=>{
        const user = await ctx.db.query("users").filter((q) => q.eq(q.field("userId"),args.userId)).first();
        if (!user) {
          return [];
        }

        const feedbacks = await ctx.db
                                   .query("feedback")
                                   .withIndex("by_user_id")
                                   .filter((q) => q.eq(q.field("userId"), user.userId))
                                   .order("desc")
                                   .collect();
            return feedbacks;
     }
})

export const deleteFeedbackById = mutation({
      args:{
         feedbackId: v.id("feedback"),
      },
      handler: async(ctx , args)=>{
           const identity = await ctx.auth.getUserIdentity();
            if (!identity) {
                  throw new Error("You must be logged in to delete feedback");
            }

            const user = await ctx.db
                  .query("users")
                  .withIndex("by_user_id")
                  .filter((q) => q.eq(q.field("userId"), identity.subject))
                  .first();

            if (!user) {
                  throw new Error("User not found");
            }

          
            const feedback = await ctx.db.get(args.feedbackId);
            if (!feedback) {
                  throw new Error("Feedback not found");
            }

           
            if (feedback.userId !== user.userId) {
                  throw new Error("You can only delete your own feedback");
            }

            
             await ctx.db.delete(args.feedbackId);
      },

})

export const updateFeedbackById = mutation({
  args: {
    feedbackId: v.id("feedback"),
    rating: v.number(),
    content: v.string(),
    userRole: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("You must be logged in to edit feedback");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

   
    const feedback = await ctx.db.get(args.feedbackId);
    if (!feedback) {
      throw new Error("Feedback not found");
    }

   
    if (feedback.userId !== user._id) {
      throw new Error("You can only edit your own feedback");
    }

    
    await ctx.db.patch(args.feedbackId, {
      rating: args.rating,
      content: args.content,
      userRole: args.userRole,
    });
  },
});