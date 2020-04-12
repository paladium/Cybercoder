<template>
  <Layout>
    <p v-for="post in $page.posts.edges" :key="post.node.path">
        <g-link :to="post.node.path">
            {{post.node.title}}
        </g-link>
    </p>

  </Layout>
</template>

<page-query>
query Posts{
    posts: allPost{
        edges{
            node{
                title
                path
            }
        }
    }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: 'Welcome to Future'
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
