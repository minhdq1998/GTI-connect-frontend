<template>
  <a class="connection-container" href="#">
      <div class="connection-info">
        <h4>{{ connection.request_type}}</h4>
        <div class="connection-description">{{ connection.description }}</div>
      </div>
      <div class="connection-meta">
          <h4>Created at:</h4>
          <p>{{ createdAt }}</p>
      </div>
  </a>
</template>

<script>
export default {
    name:"connection-list-item",
    props: {
        connection: Object
    },
    computed: {
        createdAt() {
            return Date(this.connection.created_at)
        }
    }
}
</script>

<style scoped>
.connection-container {
    display: flex;
    height: 116px;
    border: 1px solid var(--boxshadowcolour2);
    margin-bottom: 10px;
    padding: 20px;
    transition: all 0.25s;
    text-decoration: none;
    color: var(--textgray);
}

.connection-info {
    width: calc(100% - 200px)
}

.connection-description {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 48px;
}

.connection-meta {
    width: 200px;
}


.connection-container:hover {
    box-shadow: 0 0 2.5px 2px var(--boxshadowcolour2);
    cursor: pointer;
}
</style>