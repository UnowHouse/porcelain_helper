<template>

    <!-- Side-Nav-->
      <aside class="main-sidebar hidden-print">
      <section class="sidebar">
        <div class="user-panel">
          <div class="pull-left image">
            <img class="img-circle" v-bind:src="face" alt="User Image">
          </div>
          <div class="pull-left info">
            <p>{{sickname}}</p>
            <p class="designation">{{identity}}</p>
          </div>
        </div>
        <ul class="tab sidebar-menu">
          <slot></slot>
        </ul>
      <!-- Sidebar Menu-->
      </section>
     </aside>
</template>
<script>
  export default {
    name: 'sidebar',
    components: {},
    data () {
      return {
        face:'',
        sickname: '',
        identity: '',
      }
    },
    created (){
      let userInfo = JSON.parse(localStorage.getItem("userInfo"))
      this.face = userInfo.face
      this.sickname = userInfo.sickname
      this.identity = userInfo.identity
    },
    computed: {
      sidebar () {
      }
    },
    methods: {
      updateProfile(userInfo) {
        console.log(userInfo)
        this.face = userInfo.face
        this.sickname = userInfo.sickname
        this.identity = userInfo.identity
      },
    }
  }
</script>
