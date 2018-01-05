<template>
    <footer>
        <b-container>
            <b-row>
                <b-col>
                    <strong>{{ $props.system.name }}</strong>
                    <table class="footer-table">
                        <tr>
                            <th>Contact:</th>
                            <td>{{ $props.system.contact }}</td>
                        </tr>
                        <tr>
                            <th>Email:</th>
                            <td>{{ $props.system.email }}</td>
                        </tr>
                        <tr>
                            <th>Website:</th>
                            <td>{{ $props.system.website }}</td>
                        </tr>
                    </table>
                </b-col>
                <b-col>
                    <strong>Project</strong>
                    <p>This project was an practical project during the course "Programmierung von Benutzeroberflächen" (PBO) during during the winter semester 2017/18.</p>
                </b-col>
                <b-col>
                    <strong>Author</strong>
                    <p>Made with <i class="fas fa-fw fa-heart text-danger"></i> by <a href="mailto:s72888@htw-dresden.de">Dominique Heinelt</a></p>
                    <p><small>&copy; 2018 by Dominique Heinelt</small></p>
                </b-col>
            </b-row>
        </b-container>
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
        background:gray;
        color:white;
        padding:40px 0;
        margin-top:40px;
    }

    footer a {
        color: #5ddbe6;
    }

    /* Table Style 2 (Vertical) */
    .footer-table {
        width: 100%;
    }

    .footer-table td, .footer-table th {
        padding: 2px;
        text-align: left;
    }

    .footer-table th {
        color: #d3d3d3;
        font-size: 12px;
        font-weight: bold;
        vertical-align: top;
        padding-top: 9px;
    }
</style>