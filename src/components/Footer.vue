<template>
    <footer>
        <div class="footer-main">
            <b-container>
                <b-row>
                    <b-col>
                        <h5>{{ $props.system.name }}</h5>
                        <table class="footer-table">
                            <tr>
                                <th>Contact:</th>
                                <td>{{ $props.system.contact }}</td>
                            </tr>
                            <tr>
                                <th>Email:</th>
                                <td><a v-bind:href="'mailto:'+$props.system.email"> {{ $props.system.email }}</a></td>
                            </tr>
                            <tr>
                                <th>Website:</th>
                                <td><a v-bind:href="$props.system.website"> {{ $props.system.website }}</a></td>
                            </tr>
                        </table>
                    </b-col>
                    <b-col>
                        <h5>About</h5>
                        <p>This project was an practical project during the course "Programmierung von Benutzeroberflächen" (PBO) during during the winter semester 2017/18 at the HTW Dresden.</p>
                    </b-col>
                    <b-col>
                        <h5>Author</h5>
                        <p>Made with <i class="fas fa-fw fa-heart text-danger"></i> by <a href="mailto:s72888@htw-dresden.de">Dominique Heinelt</a></p>
                    </b-col>
                </b-row>
            </b-container>
        </div>
        <div class="footer-bar">
            <b-container>
                <b-row>
                    <b-col>
                        <span>&copy; 2018 by Dominique Heinelt</span>
                    </b-col>
                    <b-col class="text-right">
                        <router-link to="/">Process</router-link>
                        <router-link to="/locations">Locations</router-link>
                        <router-link to="/stakeholders">Stakeholder</router-link>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "app-footer",
        props: ['system']
    }
</script>

<style scoped>
    footer {
        background: #3c3c3c;
        color:white;
        padding:40px 0 0;
        margin-top:40px;
    }

    .footer-main h5 {
        font-weight: bold;
        font-size:18px;
        text-transform: uppercase;
        color:gray;
        margin-bottom:10px;
    }

    .footer-main {
        font-size:14px;
    }

    .footer-main p {
        line-height: 26px;
    }

    .footer-bar {
        margin-top:30px;
        background: black;
        padding: 12px 0;
        font-size:12px;
    }

    .footer-bar a {
        margin: 0 10px;
    }

    /* Table Style 2 (Vertical) */
    .footer-table {
        width: 100%;
    }

    .footer-table td, .footer-table th {
        padding: 5px;
        text-align: left;
    }

    .footer-table th {
        color: #bfbfbf;
        font-size: 12px;
        font-weight: bold;
        padding-top: 6px;
    }
</style>