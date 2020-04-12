<template>
    <Layout>
        <div
            class="max-w-md my-8 rounded overflow-hidden shadow-lg m-auto"
            v-for="post in $page.posts.edges"
            :key="post.node.path"
        >
            <g-link :to="post.node.path">
                <div v-if="post.node.coverImage">
                    <img :src="post.node.coverImage" alt />
                    <p class="text-center">Gif by Giphy</p>
                </div>
                <div class="px-6 py-4">
                    <h1 class="break-normal pt-6 pb-2 text-2xl md:text-2xl">{{post.node.title}}</h1>
                    <p
                        class="text-sm md:text-base font-normal text-grey-dark"
                    >Published {{post.node.date}}</p>
                    <div class="break-normal pt-2 text-lg" v-html="post.node.excerpt"></div>
                </div>
            </g-link>
        </div>
        <Pager :info="$page.posts.pageInfo" />
    </Layout>
</template>

<page-query>
query Posts($page: Int){
    posts: allPost(perPage: 5, page: $page, sortBy:"date", order:DESC) @paginate{
        totalCount
        pageInfo {
            totalPages
            currentPage
            isFirst
            isLast
        }
        edges{
            node{
                title
                excerpt
                coverImage
                date
                path
            }
        }
    }
}
</page-query>

<script>
import { Pager } from "gridsome";
export default {
    components: {
        Pager
    },
    metaInfo: {
        title: "Welcome to Future"
    }
};
</script>