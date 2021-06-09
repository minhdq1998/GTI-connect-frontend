<template>
  <div class="how-we-operate-container">
    <div class="left-column">
      <img src="./../../../assets/how-we-operate.jpg" alt="operate-img">
    </div>
    <div class="right-column">
      <div class="title">
        How we operate
      </div>
      <div class="content">
        <div class="content-row gt">
          <container-box class="gt-role">
            <span>Global Talent create a new connection</span>
          </container-box>
        </div>
        <div class="content-row ae">
          <container-box class="ae-role">
            <span>Australian Expert send an offer</span>
          </container-box>
        </div>
        <div class="content-row gt">
          <container-box class="gt-role">
            <span>Global Talent choose the right expert and accept an offer</span>
          </container-box>
        </div>
        <div class="content-row ae">
          <container-box class="ae-role">
            <span>Australian Expert go through the work and nomination process</span>
          </container-box>
        </div>
        <div class="content-row gt">
          <container-box class="gt-role">
            <span>Global Talent provide documents to support the process</span>
          </container-box>
        </div>
        <div class="content-row ae">
          <container-box class="ae-role">
            <span>Australian Expert send the report to finish the work</span>
          </container-box>
        </div>
        <div class="content-row gt">
          <container-box class="gt-role">
            <span>Global Talent approve when the work meet expectation</span>
          </container-box>
        </div>
      </div>
     
   
    </div>
  </div>
</template>

<script>
import ContainerBox from '@/components/atoms/ContainerBox.vue'
  export default {
    name: "how-we-operate",
    components: { ContainerBox }
  }
</script>

<style lang="scss" scoped>
.how-we-operate-container {
  margin-top: 50px;
  display: flex;
}

.left-column {
  width: 50%;
  background-color: #fcfcfc;
  display: flex;
  justify-content: center;
}

.right-column {
  width: 50%;
  padding: 20px;
}


.left-column img {
  width: 100%;
  height: auto;
}

.gt-role {
  padding: 20px;
  font-weight: 600;
  background-color: var(--secondarycolour);
  color: var(--whitecolour);
}

.ae-role {
  padding: 20px;
  font-weight: 600;
  background-color: var(--primarycolour);
  color: var(--whitecolour);
}

.gt {
  justify-content: flex-start;
}

.ae {
  justify-content: flex-end;
}

.title {
  width: 100%;
  font-size: 3vw;
  margin-bottom: 20px;
  text-align: center;
}

.content-row {
   display: flex;
   margin-bottom: 10px;
}
</style>