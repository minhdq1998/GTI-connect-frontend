<template>
<div>
    <p>{{ packageInfo.description }}</p>
    <p><span class="package-price">Price:</span>
    <span class="package-price-number"> ${{packageInfo.price_in_aud}}</span></p>
</div>
</template>

<script>
export default {
    name:"package-info-box",
    props: {
        packageInfo: {
            type: Object,
            required: true,
        }
    }
}
</script>

<style scoped>

.package-price {
    font-weight: bold;
}

.package-price-number {
    font-weight: bold;
    color: var(--secondarycolour);
}
</style>