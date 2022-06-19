<template>
  <div class="container d-flex justify-content-center">
    <div class="row bg-white shadow-sm w-25">
      <div class="col border rounded p-3">
        <h3 class="text-center mb-3">Вход</h3>
        <form @submit.prevent="submit">
          <div class="form-group mb-3">
            <label for="loginInput">Email</label>
            <input
              type="text"
              v-model="login"
              class="form-control w-100"
              :class="{ 'is-invalid': isInvalid }"
              id="loginInput"
              aria-describedby="loginValidation"
            />
            <div id="loginValidation" class="invalid-feedback" v-if="isInvalid">
              Please provide a valid city.
            </div>
          </div>
          <div class="form-group mb-3">
            <label for="passwordInput">Пароль</label>
            <input
              type="password"
              v-model="password"
              class="form-control w-100"
              :class="{ 'is-invalid': isInvalid }"
              id="passwordInput"
              aria-describedby="passwordValidation"
            />
          </div>

          <button type="submit" class="btn btn-primary w-25" >Войти</button>
        </form>
      </div>
    </div>
  </div>
  <!-- <div class="row bg-white shadow-sm">
    <form @submit.prevent="submit">
      <label for="loginInput" class="col-md-4 mb-1">Логин</label>
      <div class="col-8 col-md-8 mb-3 ">
        <input v-model="login" type="text" id="loginInput" required/>
      </div>
      <label for="passwordInput" class="col-md-4 mb-1">Пароль</label>
      <div class="col-8 col-md-8 mb-3">
        <input v-model="password" type="password" id="passwordInput" class="form-control is-invalid" required/>
      </div>

      <div class= "col-auto mb-3">
        <button type="submit" class="btn btn-success">Войти</button>
      </div>
    </form>
  </div> -->
</template>
<script>
export default {
  data() {
    return {
      login: "",
      password: "",
    };
  },
  computed: {
    isInvalid() {
      return this.$store.getters.isNotValid;
    },
  },
  methods: {
     async submit() {
       const res = await this.$store.dispatch("login", {
        login: this.login,
        password: this.password,
      })
      if(res) this.$router.push('/')
    },
  },
};
</script>

<style scoped>
html,
body {
  height: 100%;
}


body {
  background-color: azure;
}
input {
  border-radius: 5px;
  width: 30%;
}
button {
  border-radius: 5px;
  margin-left: 37.5%;
}
</style>
