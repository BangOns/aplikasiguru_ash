<script setup lang="ts">
import Avatar from "../../ui/avatar/Avatar.vue";
import AvatarImage from "../../ui/avatar/AvatarImage.vue";
import NavigationMenu from "../../ui/navigation-menu/NavigationMenu.vue";
import NavigationMenuContent from "../../ui/navigation-menu/NavigationMenuContent.vue";
import NavigationMenuItem from "../../ui/navigation-menu/NavigationMenuItem.vue";
import NavigationMenuLink from "../../ui/navigation-menu/NavigationMenuLink.vue";
import NavigationMenuList from "../../ui/navigation-menu/NavigationMenuList.vue";
import NavigationMenuTrigger from "../../ui/navigation-menu/NavigationMenuTrigger.vue";
import Vicon from "../Vicon.vue";
const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/components/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/components/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/components/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/components/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/components/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/components/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];
</script>
<template>
  <header class="w-full flex justify-between">
    <section class="flex flex-col gap-2">
      <h1 class="font-mona-bold text-xl text-slate-900">Welcome Back, admin</h1>
      <p class="font-mona-light">31, Mei 2003</p>
    </section>
    <section class="flex gap-4 items-center">
      <section>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger :chevron="false" class="bg-slate-50">
                <Vicon
                  name="io-notifications-outline"
                  scale="1.5"
                  class="cursor-pointer"
                />
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul
                  class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]"
                >
                  <li v-for="component in components" :key="component.title">
                    <NavigationMenuLink as-child>
                      <a
                        :href="component.href"
                        class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div class="text-sm font-medium leading-none">
                          {{ component.title }}
                        </div>
                        <p
                          class="line-clamp-2 text-sm leading-snug text-muted-foreground"
                        >
                          {{ component.description }}
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger :chevron="true" class="bg-slate-50">
                <Avatar>
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  />
                </Avatar>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul
                  class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]"
                >
                  <li v-for="component in components" :key="component.title">
                    <NavigationMenuLink as-child>
                      <a
                        :href="component.href"
                        class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div class="text-sm font-medium leading-none">
                          {{ component.title }}
                        </div>
                        <p
                          class="line-clamp-2 text-sm leading-snug text-muted-foreground"
                        >
                          {{ component.description }}
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </section>
    </section>
  </header>
</template>
