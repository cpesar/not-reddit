import Link from "next/link";
import Image from "next/image";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
} from "@heroui/react";
import HeaderAuth from "./header-auth";

export default function Header() {
  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand className="-ml-12">
        <Image
          src="/images/robotfood.jpg"
          alt="robotfood"
          width={50}
          height={50}
        />

        <Link href="/" className="font-bold pl-2">
          not-Reddit
        </Link>
      </NavbarBrand>

      <NavbarContent justify="center">
        <NavbarItem>
          <Input />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="-mr-12" justify="end">
        <HeaderAuth />
      </NavbarContent>
    </Navbar>
  );
}
