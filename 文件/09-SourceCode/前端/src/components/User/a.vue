<script>
export default {
    created() {
        this.a();
    },
    methods: {
        a() {
            this.$router.push({
                path: 'MainPage'
                // html取参: $route.query.id script取参: this.$route.query.id
            })
        }
    }
}
</script>