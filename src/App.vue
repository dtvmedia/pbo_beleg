<template>
    <div>
        <router-view v-bind:process="process" v-bind:system="system" v-bind:stakeholders="stakeholders" v-bind:locations="locations"></router-view>
    </div>
</template>

<script>
    import json from './process.json';
    import Vue from 'vue';

    export default {
        data: function () {
            return {
                process: json.process,
                system: json.system ,
                entrypoint: json.entrypoint ,
                stakeholder_cache: [] ,
                location_cache: [],
            }
        },
        computed: {
            stakeholders: function () {
                let tmp = [];
                let stakeholders = [];

                if( this.stakeholder_cache.length !== 0 ) {
                    return this.stakeholder_cache;
                }

                this.process.children.forEach(function ( item ) {
                    let key = item.initiator.substr(item.initiator.lastIndexOf('_') + 1);
                    Vue.set(tmp, key, item.initiator);

                    for(let i = 0; i < item.participants.length; i++ ) {
                        let key = item.participants[i].substr(item.participants[i].lastIndexOf('_') + 1);
                        Vue.set(tmp, key, item.participants[i]);
                    }
                });

                tmp.forEach(function ( item ,key ) {
                    stakeholders.push({ 'id': key, 'value': item });
                });

                this.stakeholder_cache = stakeholders;

                return stakeholders;
            },

            locations: function () {
                let tmp = [];
                let locations = [];

                if( this.location_cache.length !== 0 ) {
                    return this.location_cache;
                }

                this.process.children.forEach(function ( item ) {
                    for(let i = 0; i < item.location.length; i++ ) {
                        let key = item.location[i].substr(item.location[i].lastIndexOf('_') + 1);
                        Vue.set(tmp, key, item.location[i]);
                    }
                });

                tmp.forEach(function ( item ,key ) {
                    locations.push({ 'id': key, 'value': item });
                });

                this.location_cache = locations;

                return locations;
            } ,
        }
    }
</script>

<style>
    a {
        color: #5ddbe6;
    }
</style>
