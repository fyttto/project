<template>
<div class="login-all">
  <mylogin></mylogin>
</div>
</template>

<script>
import mylogin from '../login/component/login_box'
export default {
  name: "login",
  components: {
    mylogin
  }

}
</script>

<style>
.login-all{
    background: url('../../../assets/img/login.jpg') no-repeat;
    background-size: 100% 100%;
}
</style>
