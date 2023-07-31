<script>
    export default {
        name: 'AuthWrapper'
    }

</script>

<template>
    <div class="">
        <div class="flex">
            <div class="w-[60%] bg-white container pt-[3%] px-[10%]">
                <div class="mb-5">
                    <img src="../../../../../assets/images/logo.png" style="height: 20px; width: auto;" />
                </div>

                <slot />
            </div>
            <div class="w-[40%]">
                <img src="../../../../../assets/images/background-login.png" style="height: 100%; width: auto;" />
            </div>
        </div>
    </div>
</template>