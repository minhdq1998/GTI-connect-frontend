import store from '@/store'

export const permissions = {
    EVERYBODY: {
        'Visitor': true,
        'Australian Expert': true,
        'Global Talent': true
    },
    ONLY_VISITORS: {
        'Visitor': true,
        'Australian Expert': false,
        'Global Talent': false
    },
    ONLY_LOGGED_IN: {
        'Visitor': false,
        'Australian Expert': true,
        'Global Talent': true,
    },
    ONLY_GLOBAL_TALENTS: {
        'Visitor': false,
        'Australian Expert': false,
        'Global Talent': true,
    },
    ONLY_AUSTRALIAN_EXPERTS: {
        'Visitor': false,
        'Australian Expert': true,
        'Global Talent': false,
    }
}

export function hasPermission(permission) {
    return permission[store.state.user.role]
}