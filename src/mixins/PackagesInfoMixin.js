import {packages_info} from '@/constants'

export default {
    methods: {
        getPackageOptions() {
            let options = []
            for (let key in packages_info) {
              options.push(packages_info[key].type)
            }
            return options
        },
        getPackageInfo(packageType) {
            for (let key in packages_info) {
                if (packageType == packages_info[key].type) {
                    return packages_info[key]
                }
            }
        }
    }
}