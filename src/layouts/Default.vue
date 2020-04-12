<template>
    <main class="container w-full md:max-w-md mx-auto pt-20">
        <slot />
    </main>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>
<script>
export default {
    
};
</script>
<style lang="css">
body{
    font-family: "Robot Mono", monospace;
}
</style>