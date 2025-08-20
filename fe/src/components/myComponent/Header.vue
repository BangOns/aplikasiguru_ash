<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import Avatar from "../ui/avatar/Avatar.vue";
import AvatarImage from "../ui/avatar/AvatarImage.vue";
import NavigationMenu from "../ui/navigation-menu/NavigationMenu.vue";
import NavigationMenuContent from "../ui/navigation-menu/NavigationMenuContent.vue";
import NavigationMenuItem from "../ui/navigation-menu/NavigationMenuItem.vue";
import NavigationMenuLink from "../ui/navigation-menu/NavigationMenuLink.vue";
import NavigationMenuList from "../ui/navigation-menu/NavigationMenuList.vue";
import NavigationMenuTrigger from "../ui/navigation-menu/NavigationMenuTrigger.vue";
import Vicon from "./Vicon.vue";
import Sheet from "@/components/ui/sheet/Sheet.vue";
import SheetContent from "@/components/ui/sheet/SheetContent.vue";
import SheetHeader from "@/components/ui/sheet/SheetHeader.vue";
import SheetTitle from "@/components/ui/sheet/SheetTitle.vue";
import SheetDescription from "@/components/ui/sheet/SheetDescription.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { RouterLink } from "vue-router";
import moment from "moment";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { ListNav } from "@/utils/ListNavbar";

const openSheet = ref(false);
const date = new Date();
const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  locale: "id-ID",
};

const dateIndonesia = date.toLocaleDateString("id-ID", options as any);
const timeNow = ref(moment().format("LTS"));

onMounted(() => {
  const timer = setInterval(() => {
    timeNow.value = moment().format("LTS");
  }, 1000);

  onUnmounted(() => clearInterval(timer));
});
</script>
<template>
  <header
    class="w-full flex items-center justify-between max-lg:sticky top-0 max-lg:bg-slate-50 z-20 max-lg:border-b-2 max-lg:shadow-xl"
  >
    <section class="flex flex-col gap-2">
      <h1 class="font-mona-bold text-sm md:text-xl text-slate-900">
        Welcome Back, admin
      </h1>
      <p class="font-mona-light max-md:text-xs">
        {{ dateIndonesia }} {{ timeNow }}
      </p>
    </section>
    <section class="hidden lg:flex gap-4 items-center">
      <NavigationMenu>
        <NavigationMenuList>
          <!-- <NavigationMenuItem>
            <NavigationMenuTrigger :chevron="false" class="bg-slate-100/70">
              <Vicon
                name="io-notifications-outline"
                scale="1.5"
                class="cursor-pointer"
              />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul
                class="grid w-12 gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]"
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
          </NavigationMenuItem> -->
          <NavigationMenuItem>
            <NavigationMenuTrigger :chevron="true" class="bg-slate-100/70">
              <Avatar>
                <AvatarImage
                  src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                />
              </Avatar>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul class="w-[400px] gap-3 p-4">
                <li>
                  <NavigationMenuLink as-child>
                    <RouterLink
                      to="/"
                      class="bg-red-400 hover:bg-red-600 hover:text-white text-white w-full p-2"
                    >
                      <h5 class="font-mona-bold">Logout</h5>
                    </RouterLink>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </section>
    <section class="lg:hidden">
      <Button variant="ghost" @click="openSheet = !openSheet">
        <Vicon name="hi-menu-alt-3" scale="10" class="cursor-pointer" />
      </Button>
    </section>
  </header>
  <article>
    <Sheet v-model:open="openSheet">
      <SheetContent>
        <SheetHeader class="font-mona-bold">
          <SheetTitle>Pondok Pesantren Asshaburratib</SheetTitle>
        </SheetHeader>

        <SheetDescription class="font-mona-bold px-3">
          <ul class="flex basis-3/5 w-full h-full flex-col justify-between p-4">
            <li v-for="(value, index) in ListNav" :key="index" class="w-full">
              <!-- Kalau ada child, pakai Accordion -->
              <template v-if="value.child?.length">
                <Accordion type="single" collapsible class="w-full">
                  <AccordionItem :value="value.name">
                    <AccordionTrigger
                      class="flex items-center cursor-pointer px-2 py-3 rounded-xl hover:bg-blue-700 hover:text-white"
                    >
                      <section class="flex items-center gap-2">
                        <Vicon :name="value.icon" scale="1.5" />
                        <p class="pt-1 font-mona text-base">{{ value.name }}</p>
                      </section>
                    </AccordionTrigger>

                    <AccordionContent>
                      <ul class="flex flex-col gap-1 pl-8">
                        <li
                          v-for="(child, cIndex) in value.child"
                          :key="cIndex"
                        >
                          <RouterLink
                            :to="{ name: child.link }"
                            :class="{
                              'bg-blue-600/50 text-white':
                                $route.name == child.link,
                            }"
                            class="px-2 py-2 rounded-lg hover:bg-blue-700 hover:text-white flex items-center gap-2"
                          >
                            <Vicon :name="child.icon" scale="1.3" />
                            <span>{{ child.name }}</span>
                          </RouterLink>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </template>

              <!-- Kalau tidak ada child, langsung RouterLink -->
              <template v-else>
                <RouterLink
                  :to="{ name: value.link }"
                  :class="{
                    'bg-blue-600/50 text-white': $route.name == value.link,
                  }"
                  class="w-full flex px-2 py-3 rounded-xl hover:bg-blue-700 hover:text-white cursor-pointer font-mona items-center justify-start gap-2"
                >
                  <Vicon :name="value.icon" scale="1.5" />
                  <p class="pt-1">{{ value.name }}</p>
                </RouterLink>
              </template>
            </li>
          </ul>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  </article>
</template>
