import { SITE_NAME } from "@/utils/site";
import { useNavigate } from "@remix-run/react";
import { Button } from "@repo/ui/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@repo/ui/components/ui/navigation-menu";
import { Connect } from "./Connect";

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-primary text-primary-foreground">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex">
            <Button
              onClick={() => navigate("/")}
              className="ml-2 font-bold text-xl flex items-center"
            >
              <img
                src="/logo.svg"
                alt={SITE_NAME}
                className="h-[42px] w-[42px] mr-3"
              />
              <span className="hidden sm:block text-xl">{SITE_NAME}</span>
            </Button>
          </NavigationMenuItem>

          <div className="flex gap-2">
            <Connect />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
