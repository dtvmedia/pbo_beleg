<template>
    <b-navbar class="bg-process" type="dark" toggleable="sm" sticky>
        <b-container>
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

            <router-link to="/">
                <b-navbar-brand><i class="fab fa-vuejs"></i> PBO Beleg</b-navbar-brand>
            </router-link>

            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav>
                    <li class="nav-item">
                        <div class="nav-link">
                            <router-link to="/">Process</router-link>
                        </div>
                    </li>
                    <li class="nav-item">
                        <div class="nav-link">
                            <router-link to="/locations">Locations</router-link>
                        </div>
                    </li>
                    <li class="nav-item">
                        <div class="nav-link">
                            <router-link to="/stakeholders">Stakeholder</router-link>
                        </div>
                    </li>
                </b-navbar-nav>
            </b-collapse>
        </b-container>
    </b-navbar>
</template>

<script>
    export default {
        name: "navbar"
    }
</script>

<style scoped>
    .bg-process {
        background-color: #5ddbe6;
    }
    .nav-link  {
        min-width: 110px;
        text-align: center;
    }
    .nav-link a {
        color: #f0f0f0;
        font-size:17px;
    }
    .nav-link a.router-link-exact-active, .nav-link a:hover {
        color: #ffffff;
        font-weight: bold;
        text-decoration: none;
    }
    .navbar-dark .navbar-brand {
        color: #007bff;
        font-weight: bold;
    }
</style>