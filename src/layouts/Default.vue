<template>
    <div>
        <div
            class="flex bg-white border-b border-gray-200 fixed top-0 inset-x-0 z-100 h-16 items-center"
        >
            <div class="w-full max-w-screen-xl relative mx-auto px-6">
                <div class="flex items-center justify-center mx-6">
                    <div class="lg:w-1/4 xl:w-1/5 pl-6 pr-6">
                        <div class="flex items-center">
                            <g-link to="/" class="block font-bold">
                                <g-image src="~/logo.png"></g-image>
                            </g-link>
                        </div>
                    </div>

                    <!-- <div class="flex flex-grow lg:w-3/4 xl:w-4/5">
                        <div class="flex items-center justify-between w-1/4 px-6">
                            <div class="flex justify-end items-center">
                                <g-link>
                                    About
                                </g-link>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>

        <main class="container w-full md:max-w-md mx-auto pt-20 px-5">
            <slot />
        </main>
    </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>
<script>
export default {};
</script>
<style lang="css">
body {
    font-family: "Robot Mono", monospace;
}
</style>