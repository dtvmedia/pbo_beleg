<template>
    <div>
        <app-navbar></app-navbar>
        <app-header title="Locations"></app-header>


        <app-footer v-bind:system="$props.system"></app-footer>
    </div>
</template>

<script>
    import AppFooter from "../components/Footer.vue";

    export default {
        components: { AppFooter },
        name: "location",
        props: [
            'stakeholders',
            'process',
            'system'
        ],
    }
</script>

<style scoped>

</style>