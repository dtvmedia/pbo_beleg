<template>
    <div>
        <app-navbar></app-navbar>
        <app-header title="Stakeholder" icon="fa-briefcase"></app-header>

        <b-container>
            <b-table striped v-bind:items="this.$props.stakeholders" v-bind:fields="fields" :current-page="currentPage" :per-page="perPage">
                <template slot="actions" slot-scope="row">
                    <b-button size="sm" variant="success"  v-on:click.stop="showEditModal(row.item, $event.target)">
                        <i class="fas fa-fw fa-pencil-alt"></i> Edit
                    </b-button>
                </template>
            </b-table>
            <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" align="center"></b-pagination>
        </b-container>

        <!-- Modal Form -->
        <b-modal id="stakeholder_edit" title="Edit Stakeholder" header-bg-variant="dark" header-text-variant="light" ok-variant="success" v-on:ok="submitForm">
            <template slot="modal-ok">
                <i class="fas fa-pencil-alt"></i> Edit Stakeholder
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
    import AppNavbar from "../components/Navbar.vue";
    import AppHeader from "../components/Header.vue";
    import AppFooter from "../components/Footer.vue";

    export default {
        components: { AppNavbar, AppHeader , AppFooter },
        name: "stakeholder",
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
                totalRows: this.$props.stakeholders.length,

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
            'stakeholders',
            'process',
            'system'
        ],
        methods: {

            showEditModal: function (item, button) {
                this.form.id = item.id;
                this.form.name = item.value;

                // Show Modal
                this.$root.$emit('bv::show::modal', 'stakeholder_edit', button);
            },

            changeStakeholderName: function ( id, name ) {
                let key = null;
                for(let i=0; i<this.$props.stakeholders.length; i++) {
                    if( this.$props.stakeholders[i].id === id ) {
                        key = i;
                        break;
                    }
                }

                if( key !== null ) {
                    Vue.set( this.$props.stakeholders, key, { 'id': id, 'value': name } );
                }
            },

            submitForm: function () {
                this.changeStakeholderName(this.form.id , this.form.name );
            }
        }
    }
</script>

<style scoped>

</style>