<template>
  <div class="container d-flex justify-content-center">
    <div class="row bg-white shadow-sm w-25">
      <div class="col border rounded p-3">
        <h3 class="text-center mb-3">Вход</h3>
        <form @submit.prevent="submit">
          <div class="form-group mb-3">
            <label for="loginInput">Логин</label>
            <input
              type="text"
              v-model="login"
              class="form-control w-100"
              :class="{ 'is-invalid': !isValid }"
              id="loginInput"
              aria-describedby="loginValidation"
            />
          </div>
          <div class="form-group mb-3">
            <label for="passwordInput">Пароль</label>
            <input
              type="password"
              v-model="password"
              class="form-control w-100"
              :class="{ 'is-invalid': !isValid }"
              id="passwordInput"
              aria-describedby="passwordValidation"
            />
          </div>

          <button type="submit" class="btn btn-primary w-25" >Войти</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      login: "",
      password: "",
      isValid : true
    };
  },

  computed: {
  },

  methods: {
     async submit() {
       const res = await this.$store.dispatch("login", {
        login: this.login,
        password: this.password,
      })
      if(res) {
        this.$router.push('/')}
      else this.isValid = false
    },
  },
};
</script>

<style scoped>
input {
  border-radius: 5px;
  width: 30%;
}
button {
  border-radius: 5px;
  margin-left: 37.5%;
}
</style>
