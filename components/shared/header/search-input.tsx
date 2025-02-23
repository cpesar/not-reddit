"use client";

import { Input } from "@heroui/react";
import { useSearchParams } from "next/navigation";
import { search } from "@/lib/actions/search";

const SearchInput = () => {
  const searchParams = useSearchParams();
  return (
    <form action={search}>
      <Input name="term" defaultValue={searchParams.get("term") || ""} />
    </form>
  );
};

export default SearchInput;
