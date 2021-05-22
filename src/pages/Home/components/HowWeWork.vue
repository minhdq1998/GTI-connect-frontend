<template>
  <div class="how-we-work">
    <div class="title">
      How we work
    </div>
    <div class="content">
      <div class="content-item left-item">
        <div class="content-title">
          <i class="fas fa-briefcase"></i>
          Global talents
        </div>
        <div class="content-list">
          <ul>
            <li>Connect with Australian experts</li>
            <li>Refine your resume</li>
            <li>Improve your work social network profile</li>
            <li>Get nominated by an expert</li>
          </ul>
        </div>
      </div>
      <div class="content-item">
        <div class="content-title">
          <i class="fas fa-user-tie"></i>
           Australian experts
        </div>
        <div class="content-list">
           <ul>
            <li>Help talents archiving their goals</li>
            <li>Contribute to the workforce</li>
            <li>Share your experience to the global talents</li>
            <li>Expand your network</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
  .how-we-work {
    margin-top: 10px;
    border: 1px solid var(--secondarycolour);
    border-radius: 10px;
    max-height: 400px;
    padding: 20px;
    background-color: #e3ffec;
  }

  .title {
    width: 100%;
    font-size: 3vw;
    margin-bottom: 20px;
    text-align: center;
  }

  .content {
    display: flex;
  }

  .content-item {
    width: 50%;
    height: 200px;
  }

  .content-title {
    text-align: center;
    font-size: 2vw;
  }

  .content-list {
    padding-left: 20px;
    font-size: 1.4rem;
  }

  .left-item {
    border-right: 1px solid var(--secondarycolour);
  }

  .fas {
    margin-right: 5px;
  }

  ul {
    list-style-type: none
  }
</style>