import { z } from "zod";

export const createTopicSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});

export const createPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  // user: z.number().int().positive("User is required"),
  // topic: z.number().int().positive("Topic is required"),
});
