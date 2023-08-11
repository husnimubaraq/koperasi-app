<script setup lang="ts">

const categories = ["Panduan", "Penyataan Umum"]

</script>

<template>
    <div class="container p-10 flex-1">
        <p class="text-2xl capitalize mb-5">Bantuan</p>
        <TabGroup>
            <TabList class="flex space-x-5 rounded-xl ">
                <Tab v-for="category in categories" as="template" :key="category" v-slot="{ selected }">
                    <button :class="[
                        'px-3 rounded-lg py-2.5 text-sm font-medium leading-5',
                        selected
                            ? 'bg-[#29A073]'
                            : 'bg-white',
                    ]">
                        {{ category }}
                    </button>
                </Tab>
            </TabList>

            <TabPanels class="mt-2">
                <TabPanel
                    key="Panduan"
                    :class="[
                        'rounded-xl bg-white p-3',
                    ]"
                >
                    <BantuanPanduan/>
                </TabPanel>
                <TabPanel
                    key="Penyataan Umum"
                    :class="[
                        'rounded-xl bg-white p-3',
                    ]"
                >
                    <BantuanUmum/>
                </TabPanel>
            </TabPanels>
        </TabGroup>
    </div>
</template>
