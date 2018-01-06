<template>
    <div>
        <app-navbar></app-navbar>
        <app-header title="Locations"></app-header>

        <b-container>
            <b-table striped v-bind:items="this.$props.locations" v-bind:fields="fields" :current-page="currentPage" :per-page="perPage">
                <template slot="actions" slot-scope="row">
                    <b-button size="sm" variant="success"  v-on:click.stop="showEditModal(row.item, $event.target)">
                        <i class="fas fa-fw fa-pencil-alt"></i> Edit
                    </b-button>
                </template>
            </b-table>
            <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" align="center"></b-pagination>
        </b-container>

        <!-- Modal Form -->
        <b-modal id="location_edit" title="Edit Location" header-bg-variant="dark" header-text-variant="light" ok-variant="success" v-on:ok="submitForm">
            <template slot="modal-ok">
                <i class="fas fa-pencil-alt"></i> Edit Location
            </template>

            <b-form>
                <input type="hidden" v-model="form.id" disabled>

                <b-form-group label="Name:">
                    <b-form-input type="text" v-model="form.name" placeholder="Name"></b-form-input>
                </b-form-group>
            </b-form>
        </b-modal>

        <app-footer v-bind:system="$props.system"></app-footer>
    </div>
</template>

<script>
    import Vue from 'vue';
    import AppFooter from "../components/Footer.vue";

    export default {
        components: { AppFooter },
        name: "location",
        data: function () {
            return {
                /**
                 * Table Column Definitions
                 */
                fields: [
                    { key: 'id', sortable: true },
                    { key: 'value', sortable: true , label: 'Name' },
                    { key: 'actions' },
                ],

                /**
                 * Pagination Data
                 */
                currentPage: 1,
                perPage: 10,
                totalRows: this.$props.locations.length,

                /**
                 * Form Input Vars
                 */
                form: {
                    id: null ,
                    name: null ,
                }
            }
        },
        props: [
            'locations',
            'process',
            'system'
        ],
        methods: {

            showEditModal: function ( item, button ) {
                this.form.id = item.id;
                this.form.name = item.value;

                // Show Modal
                this.$root.$emit( 'bv::show::modal', 'location_edit', button );
            },

            changeLocationName: function ( id, name ) {
                let key = null;
                for ( let i = 0; i < this.$props.locations.length; i++ ) {
                    if ( this.$props.locations[ i ].id === id ) {
                        key = i;
                        break;
                    }
                }

                if ( key !== null ) {
                    Vue.set( this.$props.locations, key, { 'id': id, 'value': name } );
                }
            },

            submitForm: function () {
                this.changeLocationName( this.form.id, this.form.name );
            }
        }
    }
</script>

<style scoped>

</style>