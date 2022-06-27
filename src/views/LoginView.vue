<template>
  <div class="background">
    <form 
      class="main"
      @submit.prevent="onLogin" 
    >
      <h3 class="form-header">
        Авторизация
      </h3>
      <input
        id="loginInput"
        v-model="loginField"
        type="text"
        class="auth-input"
        :class="{ 'invalid': !isValid }"
        aria-describedby="loginValidation"
        placeholder="Имя пользователя"
      >
      <input 
        id="passwordInput"
        v-model="passwordField"
        type="password"
        class="auth-input"
        :class="{ 'invalid': !isValid }"
        aria-describedby="passwordValidation"
        placeholder="Пароль"
      >
      <button 
        type="submit" 
        class="auth-send"
      >
        Отправить
      </button>
    </form>
  </div>
</template>
<script>
import {ref} from 'vue'
import {login} from '../services/AuthService.js'
import {useRouter} from 'vue-router'
export default {

  setup()
  {
    const isValid = ref(true);
    const loginField = ref('');
    const passwordField = ref('');
    const router = useRouter();

    const onLogin = async ()=>
    {
       isValid.value = await login(router,loginField.value,passwordField.value);
    }

    return {
      isValid,
      loginField,
      passwordField,
      onLogin,
    }
  }
};

</script>


<style scoped>

.background {
    height: 100vh;
    padding-top: 334px;
    background: url("../../public/login-background.jpg") no-repeat center;
    background-size: cover;
}

.main {
    width: 352px;
    height: 282px;
    padding: 42px;
    background: rgba(255, 255, 255, 0.67);
    backdrop-filter: blur(14px);
    border-radius: 4px;
    display: flex;
    flex-wrap: wrap;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    margin: auto;
}

.form-header {
    opacity: 100%;
    width: 268px;
    height: 32px;
    margin-bottom: 16px;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 32px;
    letter-spacing: 0.25px;
    text-align: center;
}

.auth-input {
    width: 268px;
    height: 41px;
    outline: none;
    background: #ffffff;
    border-radius: 4px;
    margin-bottom: 16px;
    border-width: 0px;
}

.auth-input::placeholder {
    text-align: center;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.5px;
    color: rgba(0, 0, 0, 0.87);
}

.invalid {
    border: 1px solid #e21a1a;
}


.auth-send {
    padding: 0px 12px;
    width: 123px;
    height: 36px;
    border-width: 0px;
    background: #e21a1a;
    border-radius: 4px;
    color: white;
    text-align: center;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 14px;
    line-height: 36px;
}

</style>
