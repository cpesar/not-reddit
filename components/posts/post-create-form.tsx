"use client";

import { useActionState, startTransition, useState, useEffect } from "react";
import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Form,
} from "@heroui/react";
import { createPost } from "@/lib/actions/create-post.action";
import FormButton from "../common/form-button";

type PostCreateFormProps = {
  slug: string;
};

const PostCreateForm = ({ slug }: PostCreateFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, action, isPending] = useActionState(
    createPost.bind(null, slug),
    {
      errors: {},
    }
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }
  return (
    <Popover placement="left" isOpen={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Button color="primary">Create a Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Post</h3>
            <Input
              name="title"
              label="Title"
              labelPlacement="outside"
              placeholder="Title"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(", ")}
            />
            <Textarea
              name="content"
              label="Content"
              labelPlacement="outside"
              placeholder="Describe your post"
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(", ")}
            />
            {formState.errors._form ? (
              <div className="rounded p-2 bg-red-200 border border-red-400">
                {formState.errors._form.join(", ")}
              </div>
            ) : null}
            <FormButton
            // isLoading={isPending}
            >
              Submit
            </FormButton>
          </div>
        </Form>
      </PopoverContent>
    </Popover>
  );
};

export default PostCreateForm;
