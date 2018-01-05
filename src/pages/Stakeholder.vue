<template>
    <div>
        <app-navbar></app-navbar>
        <app-header title="Stakeholder"></app-header>

        <b-container>
            <b-table bordered striped v-bind:items="this.$props.stakeholders" v-bind:fields="fields">
                <template slot="actions" slot-scope="row">
                    <b-button size="sm" variant="outline-dark"  v-on:click.stop="showEditModal(row.item, $event.target)">
                        <i class="fas fa-fw fa-pencil-alt"></i> Edit
                    </b-button>
                </template>
            </b-table>
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
    import AppFooter from "../components/Footer.vue";

    export default {
        components: { AppFooter },
        name: "stakeholder",
        data: function () {
            return {
                fields: [
                    { key: 'id', sortable: true },
                    { key: 'value', sortable: true },
                    { key: 'actions' },
                ],

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