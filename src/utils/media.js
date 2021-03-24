export function getMediaUrl(path) {
    return process.env.VUE_APP_ROOT_API.concat(path)
}