<template>
    <div>
        <app-navbar></app-navbar>
        <app-header v-bind:title="'Process: ' + process.name"></app-header>

        <!-- Table -->
        <b-container>
            <b-table striped v-bind:items="process.children" v-bind:fields="fields" :current-page="currentPage" :per-page="perPage">
                <template slot="id_link" slot-scope="row">
                    <div>
                        <a v-bind:href="row.item.id">{{ row.item.id.substring(row.item.id.lastIndexOf('/') + 1) }}</a>
                    </div>
                </template>
                <template slot="initiator" slot-scope="row">
                    {{ getStakeholder(row.item.initiator) }}
                </template>
                <template slot="location" slot-scope="row">
                    <span v-for="loc in row.item.location">{{ getLocation(loc) }} </span>
                </template>
                <template slot="start_time" slot-scope="row">
                    {{ new Date( row.item.start ).toDateString() }}
                </template>
                <template slot="participation_badge" slot-scope="row">
                    <b-badge v-if="row.item.participation === 'partial opened'" variant="info">Partial Opened</b-badge>
                    <b-badge v-if="row.item.participation === 'closed'" variant="primary">Closed</b-badge>
                    <b-badge v-if="row.item.participation === 'open'" variant="warning">Open</b-badge>
                </template>
                <template slot="actions" slot-scope="row">
                    <b-button-group>
                        <b-button size="sm" variant="success" v-on:click.stop="showInfoModal(row.item, $event.target)">
                            <i class="fas fa-fw fa-folder-open"></i> Details
                        </b-button>
                    </b-button-group>

                </template>
            </b-table>
            <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" align="center"></b-pagination>
        </b-container>

        <!-- Info modal -->
        <b-modal id="modalInfo" size="lg" @hide="resetModal" :title="modalInfo.title" ok-only header-bg-variant="dark" header-text-variant="light" ok-variant="success">
            <table class="table-style-2">
                <tr>
                    <th>ID</th>
                    <td><a v-bind:href="modalInfo.data.id">{{ modalInfo.data.id }}</a></td>
                </tr>
                <tr>
                    <th>Initiator</th>
                    <td>{{ getStakeholder(modalInfo.data.initiator) }}</td>
                </tr>
                <tr>
                    <th>Description</th>
                    <td>{{ modalInfo.data.description }}</td>
                </tr>
                <tr>
                    <th>Location</th>
                    <td><div v-for="loc in modalInfo.data.location">{{ getLocation(loc) }}</div></td>
                </tr>
                <tr>
                    <th>Start</th>
                    <td>{{ new Date( modalInfo.data.start ).toDateString() }}</td>
                </tr>
                <tr>
                    <th>End</th>
                    <td>
                        <span v-if="modalInfo.data['end (optional)'] !== ''">{{ new Date( modalInfo.data['end (optional)'] ).toDateString() }}</span>
                        <span v-else>-</span>
                    </td>
                </tr>
                <tr>
                    <th>Participation</th>
                    <td>{{ modalInfo.data.participation }}</td>
                </tr>
                <tr>
                    <th>Participants</th>
                    <td><div v-for="part in modalInfo.data.participants">{{ getStakeholder(part) }}</div></td>
                </tr>
                <tr>
                    <th>Results</th>
                    <td>
                        <div v-for="result in modalInfo.data['results (optional)']">
                            <span>{{ result.name }}</span>
                            <small class="text-muted">(ID: {{ result.id }})</small>
                        </div>
                    </td>
                </tr>
            </table>
        </b-modal>

        <app-footer v-bind:system="$props.system"></app-footer>
    </div>
</template>

<script>
    import AppFooter from "../components/Footer.vue";

    export default {
        components: { AppFooter },
        name: "process",
        data: function () {
            return {
                /**
                 * Table Column Definitions
                 */
                fields: [
                    { key: 'id_link' ,label: 'Id' , tdClass: 'process-id' },
                    { key: 'name', sortable: true , tdClass: 'process-name' },
                    { key: 'participation_badge', label: 'Participation', tdClass: 'process-badge' },
                    { key: 'initiator', sortable: true },
                    { key: 'location', sortable: true } ,
                    { key: 'start_time'} ,
                    { key: 'actions' }
                ],

                /**
                 * Pagination Data
                 */
                currentPage: 1,
                perPage: 10,
                totalRows: this.$props.process.children.length,

                /**
                 * Modal Data
                 */
                modalInfo: {
                    title: '',
                    data: ''
                }
            }
        } ,
        props: [
            'stakeholders',
            'process',
            'system' ,
            'locations'
        ] ,
        methods: {

            showInfoModal ( item, button ) {
                this.modalInfo.title = item.name;
                this.modalInfo.data = item;

                // Show Modal
                this.$root.$emit('bv::show::modal', 'modalInfo', button);
            },

            resetModal () {
                this.modalInfo.title = '';
                this.modalInfo.data = '';
            },

            parseId: function ( object ) {
                let id = object;

                if( isNaN( id ) && typeof id === 'string' ) {
                    id = parseInt( id.substr(id.lastIndexOf('_') + 1 ) );
                }

                if( typeof id !== 'number' ) {
                    return null;
                }

                return id;
            } ,

            getStakeholder: function ( stakeholder ) {
                let key = null;
                let id = this.parseId( stakeholder );

                for ( let i = 0; i < this.$props.stakeholders.length; i++ ) {
                    if ( this.$props.stakeholders[ i ].id === id ) {
                        key = i;
                        break;
                    }
                }

                if( this.$props.stakeholders[key] ) {
                    return this.$props.stakeholders[key].value;
                }

                return null;
            },

            getLocation: function ( location ) {
                let key = null;
                let id = this.parseId( location );

                for ( let i = 0; i < this.$props.locations.length; i++ ) {
                    if ( this.$props.locations[ i ].id === id ) {
                        key = i;
                        break;
                    }
                }

                if( this.$props.locations[key] ) {
                    return this.$props.locations[key].value;
                }

                return null;
            }
        }
    }
</script>

<style>
    .process-id div {
        text-align: center;
        margin: 0 -6px 0 -3px;
    }
    .process-id a {
        font-size:24px;
        font-weight: lighter;
    }

    .process-name {
        font-weight: 300;
        font-size:20px;
    }

    .process-badge .badge {
        width:102px;
        border-radius: 2px;
        padding:5px;
        font-size:11px;
        text-transform: uppercase;
    }

    /* Table Style 2 (Vertical) */
    .table-style-2 {
        width: 100%;
    }

    .table-style-2 td, .table-style-2 th {
        padding: 5px;
        text-align: left;
    }

    .table-style-2 th {
        color: #787878;
        font-size: 12px;
        font-weight: bold;
        vertical-align: top;
        padding-top: 9px;
    }
</style>