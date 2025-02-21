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
import { createTopic } from "@/lib/actions/create-topic.action";
import FormButton from "../common/form-button";
import { set } from "zod";

const TopicCreateForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, action, isPending] = useActionState(createTopic, {
    errors: {},
  });

  // Watch formState.success and close the popover when it changes to true
  useEffect(() => {
    if (formState.success) {
      setIsOpen(false);
    }
  }, [formState.success]);

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
        <Button color="primary">Create a Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Topic</h3>
            <Input
              name="name"
              label="Name"
              labelPlacement="outside"
              placeholder="Name"
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(", ")}
            />
            <Textarea
              name="description"
              label="Description"
              labelPlacement="outside"
              placeholder="Describe your topic"
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(", ")}
            />
            <FormButton isLoading={isPending}>Submit</FormButton>
          </div>
        </Form>
      </PopoverContent>
    </Popover>
  );
};

export default TopicCreateForm;
