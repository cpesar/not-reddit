"use client";

import { Button } from "@heroui/react";

interface FormButtonProps {
  children: React.ReactNode;
  isPending?: boolean;
}

const FormButton = ({ children, isPending }: FormButtonProps) => {
  return (
    <Button type="submit" isLoading={isPending}>
      {children}
    </Button>
  );
};

export default FormButton;
