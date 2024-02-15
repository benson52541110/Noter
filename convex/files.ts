import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const create = mutation({
	args: {
		title: v.string(),
		parentDocumentId: v.optional(v.id("files")),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error("Unauthenticated");
		}
		const userId = identity.subject;
		const file = await ctx.db.insert("files", {
			title: args.title,
			userId,
			parentDocumentId: args.parentDocumentId,
			isArchived: false,
			isPublished: false,
		});
		return file;
	},
});

export const getSidebar = query({
	args: {
		parentDocumentId: v.optional(v.id("files")),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error("Unauthenticated");
		}

		const file = await ctx.db.query("files").collect();
		return file;
	},
});
