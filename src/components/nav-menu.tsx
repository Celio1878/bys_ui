import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { FC } from "react";
import Link from "next/link";
import { navbar_items } from "@/utils/navbar_items";

export const NavMenu: FC = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navbar_items.map((item) => (
          <NavigationMenuItem key={item.key}>
            <Link href={item.href} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {item.label}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
