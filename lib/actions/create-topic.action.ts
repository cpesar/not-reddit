//
"use server";

import { prisma } from "@/db/prisma";
import { createTopicSchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";
import { slugify } from "../utils/utils";

interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
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

  try {
    await prisma.topic.create({
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
    console.error("Failed to create topic:", error);
    return {
      errors: {
        name: ["Failed to create topic"],
      },
      success: false,
    };
  }
}
