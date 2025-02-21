"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@heroui/react";

interface FormButtonProps {
  children: React.ReactNode;
  isLoading?: boolean;
}

const FormButton = ({ children, isLoading }: FormButtonProps) => {
  //   const { pending } = useFormStatus();
  return (
    <Button type="submit" isLoading={isLoading}>
      {children}
    </Button>
  );
};

export default FormButton;
