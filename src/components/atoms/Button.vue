<template>
    <button :text="text" :styleMode="styleMode" :style="style">{{text}}</button>
</template>
<script>
export default {
    name: 'Button',
    props: {
        text: {
            type: String,
        },
        href: {
            type: String,
            default: '#'
        },
        styleMode: {
            type: String,
        }
    },
    computed: {
      style () {
        return 'background-color: ' +  this.styleMode;
      }
    }
   
}
</script>

<style scoped>
button {
  border: none;
  color: white;
  padding: 10px 15px;
  text-align: center;
  display: inline-flex;
  cursor: pointer;
  font-weight: 700;
 
}
</style>