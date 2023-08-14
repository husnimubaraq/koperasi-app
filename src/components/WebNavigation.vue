<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import { breakpointsTailwind } from "@vueuse/core";
import { useNotifikasiStore } from "./features/notifikasi/stores/notifikasi";
import { storeToRefs } from "pinia";

const { user, getProfile, logout } = useAuthStore();
const { getNotifikasiCount } = useNotifikasiStore();

const { count } = storeToRefs(useNotifikasiStore());

const breakpoints = useBreakpoints(breakpointsTailwind);

const mobileNav = ref(false);

const isAdmin = user?.role === "admin";

function onLogout() {
  logout();
}

onMounted(() => {
  getProfile();
  getNotifikasiCount();
});
</script>

<template>
  <div
    class="py-5 px-10 flex justify-between items-center 2xl:px-80 bg-[#c8ee44]"
  >
    <div class="text-3xl">
      <span class="font-bold text-black">KUD</span
      ><span class="font-light text-black">Teratai Biru</span>
    </div>

    <!-- Desktop Navigation -->
    <div v-if="breakpoints.isGreater('lg')" class="space-x-2 flex">
      <router-link
        to="/"
        class="font-medium py-1.5 px-3 rounded-full transition hover:bg-white"
        active-class="text-black bg-white"
      >
        Beranda
      </router-link>
      <router-link
        to="/tagihan"
        class="font-medium py-1.5 px-3 rounded-full transition hover:bg-white"
        active-class="text-black bg-white"
      >
        {{ isAdmin ? "Daftar Tagihan" : "Tagihan" }}
      </router-link>

      <router-link
        v-if="!isAdmin"
        to="/rekap"
        class="font-medium py-1.5 px-3 rounded-full transition hover:bg-white"
        active-class="text-black bg-white"
      >
        Rekap
      </router-link>

      <router-link
        v-else
        to="/nasabah"
        class="font-medium py-1.5 px-3 rounded-full transition hover:bg-white"
        active-class="text-black bg-white"
      >
        Daftar Nasabah
      </router-link>

      <router-link
        to="/pengajuan"
        class="font-medium py-1.5 px-3 rounded-full transition hover:bg-white"
        active-class="text-black bg-white"
      >
        {{ isAdmin ? "Daftar Pengajuan" : "Pengajuan" }}
      </router-link>
      <router-link
        to="/bantuan"
        class="font-medium py-1.5 px-3 rounded-full transition hover:bg-white"
        active-class="text-black bg-white"
      >
        Bantuan
      </router-link>

      <div class="">
        <div class="flex items-center gap-x-3">
          <router-link to="/notifikasi" class="">
            <div class="relative cursor-pointer hover:text-white">
              <BellCircle />
              <div class="absolute -top-2 -right-2">
                <div
                  class="h-5 w-5 rounded-full bg-[#ff0000] flex flex-col items-center justify-center"
                  v-if="count > 0"
                >
                  <p class="text-[10px] text-white">{{ count }}</p>
                </div>
              </div>
            </div>
          </router-link>

          <Menu as="div" class="text-left relative">
            <div>
              <menu-button
                class="inline-flex justify-center items-center font-medium py-1.5 px-3 rounded-full transition bg-white hover:bg-white hover:text-black"
              >
                {{ user?.name }}
                <i-carbon-chevron-down
                  class="w-3 h-3 ml-2 -mr-1"
                  aria-hidden="true"
                />
              </menu-button>
            </div>

            <transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <menu-items
                class="absolute right-0 w-56 mt-2 p-2 origin-top-right z-10 bg-white divide-y divide-gray-100 rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <menu-item>
                  <router-link
                    to="/profile"
                    class="group flex rounded-md items-center w-full px-2 py-2 text-sm"
                  >
                    Ubah Profile
                  </router-link>
                </menu-item>
                <menu-item>
                  <button
                    @click="onLogout"
                    :class="[
                      'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                    ]"
                  >
                    Keluar
                  </button>
                </menu-item>
              </menu-items>
            </transition>
          </Menu>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div v-else>
      <button @click="mobileNav = true">
        <i-carbon-menu class="h-6 w-6 text-red-600" />
      </button>

      <transition-root as="template" :show="mobileNav">
        <Dialog
          as="div"
          class="fixed inset-0 overflow-hidden"
          @close="mobileNav = false"
        >
          <div class="absolute inset-0 overflow-hidden">
            <transition-child
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <DialogOverlay
                class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              />
            </transition-child>
            <div
              class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-20"
            >
              <transition-child
                as="template"
                enter="transform transition ease-in-out duration-300 sm:duration-700"
                enter-from="translate-x-full"
                enter-to="translate-x-0"
                leave="transform transition ease-in-out duration-300 sm:duration-700"
                leave-from="translate-x-0"
                leave-to="translate-x-full"
              >
                <div class="pointer-events-auto relative w-screen max-w-md">
                  <transition-child
                    as="template"
                    enter="ease-in-out duration-300"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="ease-in-out duration-300"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                  >
                    <div
                      class="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4"
                    >
                      <button
                        type="button"
                        class="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        @click="mobileNav = false"
                      >
                        <span class="sr-only">Close panel</span>
                        <i-carbon-close class="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </transition-child>
                  <div
                    class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl"
                  >
                    <div class="relative mt-6 flex-1 px-4 sm:px-6">
                      <!-- Navigation -->
                      <div class="px-4 sm:px-6 space-y-3">
                        <router-link
                          to="/"
                          active-class="text-red-500"
                          class="flex gap-x-2.5 items-center"
                          @click="mobileNav = false"
                        >
                          <i-carbon-home class="h-6 w-6" />
                          <div class="text-2xl tracking-widest">Beranda</div>
                        </router-link>

                        <router-link
                          to="/"
                          active-class="text-red-500"
                          class="flex gap-x-2.5 items-center"
                          @click="mobileNav = false"
                        >
                          <i-carbon-home class="h-6 w-6" />
                          <div class="text-2xl tracking-widest">Tagihan</div>
                        </router-link>

                        <router-link
                          to="/"
                          active-class="text-red-500"
                          class="flex gap-x-2.5 items-center"
                          @click="mobileNav = false"
                        >
                          <i-carbon-home class="h-6 w-6" />
                          <div class="text-2xl tracking-widest">Rekap</div>
                        </router-link>

                        <router-link
                          to="/"
                          active-class="text-red-500"
                          class="flex gap-x-2.5 items-center"
                          @click="mobileNav = false"
                        >
                          <i-carbon-home class="h-6 w-6" />
                          <div class="text-2xl tracking-widest">Pengajuan</div>
                        </router-link>

                        <router-link
                          to="/"
                          active-class="text-red-500"
                          class="flex gap-x-2.5 items-center"
                          @click="mobileNav = false"
                        >
                          <i-carbon-home class="h-6 w-6" />
                          <div class="text-2xl tracking-widest">Bantuan</div>
                        </router-link>

                        <div
                          @click="onLogout"
                          class="text-2xl tracking-widest cursor-pointer"
                        >
                          Keluar
                        </div>
                      </div>
                      <!-- Navigation -->
                    </div>
                  </div>
                </div>
              </transition-child>
            </div>
          </div>
        </Dialog>
      </transition-root>
    </div>
  </div>
</template>
