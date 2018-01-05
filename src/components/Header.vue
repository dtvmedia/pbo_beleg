<template>
    <!-- Jumbotron + Create Button -->
    <b-jumbotron fluid>
        <template slot="header">
            <span>{{ title }}</span>
            <div class="float-right">
                <slot>

                </slot>
            </div>
        </template>
    </b-jumbotron>
</template>

<script>
    export default {
        name: "app-header",
        props: ['title']
    }
</script>

<style scoped>

</style>