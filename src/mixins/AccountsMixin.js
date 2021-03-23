import {account_role} from '@/constants'
import {mapState} from 'vuex'

export default {
    data() {
        return {
            account_role:account_role
        }
    },
    computed: {
        ...mapState({
            user: state => ({
                id: state.user.id,
                first_name: state.user.first_name,
                last_name: state.user.last_name,
                role: state.user.role,
                avatarUrl: state.user.avatarUrl
            })
        }),
        isAE() { return this.user.role == account_role.AE },
        isGT() { return this.user.role == account_role.GT },
        isVisitor() { return this.user.role == account_role.VISITOR },
        isLoggedIn() { return !this.isVisitor },
    },
    methods: {
        hasPermission(permission) { return permission[this.user.role] }
    }
}