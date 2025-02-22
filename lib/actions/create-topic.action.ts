"use server";

import { prisma } from "@/db/prisma";
import { createTopicSchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";
import { slugify } from "../utils/utils";
import { auth } from "@/auth";
import { Topic } from "@prisma/client";

interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
  success?: boolean;
}

export async function createTopic(
  formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  // Make sure we're returning the correct type
  const result = createTopicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      success: false,
    };
  }
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return {
      errors: {
        _form: ["You must be logged in to create a topic"],
      },
      success: false,
    };
  }

  let topic: Topic;
  try {
    topic = await prisma.topic.create({
      data: {
        slug: slugify(result.data.name),
        description: result.data.description,
      },
    });

    revalidatePath("/");

    return {
      errors: {},
      success: true,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Failed to create topic"],
        },
      };
    }
  }
}
