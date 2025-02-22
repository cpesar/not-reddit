"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@heroui/react";

interface FormButtonProps {
  children: React.ReactNode;
  isPending?: boolean;
}

const FormButton = ({ children, isPending }: FormButtonProps) => {
  //   const { pending } = useFormStatus();
  return (
    <Button type="submit" isLoading={isPending}>
      {children}
    </Button>
  );
};

export default FormButton;
