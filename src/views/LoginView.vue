<template>
  <div :class="style['background']">
    <form 
      :class="style['auth-form']"
      @submit.prevent="onLogin" 
    >
      <h3 :class="style['form-header']">
        Авторизация
      </h3>
      <input
        id="loginInput"
        v-model="loginField"
        type="text"
        :class="fieldStyles"
        aria-describedby="loginValidation"
        placeholder="Имя пользователя"
      >
      <input 
        id="passwordInput"
        v-model="passwordField"
        type="password"
        :class="fieldStyles"
        aria-describedby="passwordValidation"
        placeholder="Пароль"
      >
      <button 
        type="submit" 
        :class="style['auth-send']"
      >
        Отправить
      </button>
    </form>
    <button :class="style['chat-btn']">
      <span 
        class="material-icons"
        :class="style['chat']"
      >
        chat
      </span>
    </button>
  </div>
</template>


<script setup>

import {computed, ref, useCssModule} from 'vue'
import {login} from '../services/AuthService.js'
import {useRouter} from 'vue-router'

const style = useCssModule();

const isValid = ref(true);
const loginField = ref('');
const passwordField = ref('');

const router = useRouter();

const onLogin = async ()=>
{
  isValid.value = await login(router,loginField.value,passwordField.value);
}

const fieldStyles = computed(()=>
{
  if(isValid.value === false) return [style['auth-input'],style['invalid']]
  return style['auth-input'];
})

</script>


<style module>

:root
{
  --form-bg-color:rgba(255, 255, 255, 0.67);
  --auth-button-font-color: #ffffff;
}

.background {
    height: 100vh;
    padding-top: 334px;
    background: url("../../public/login-background.jpg") no-repeat center;
    background-size: cover;
}

.auth-form {
    width: 352px;
    height: 282px;
    padding: 42px;
    margin: auto;
    background: var(--form-bg-color);
    backdrop-filter: blur(14px);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.form-header {
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
    background: var(--bg-color);
    margin-bottom: 16px;
    outline: none;
    border-width: 0px;
    border-radius: 4px;
}

.auth-input::placeholder {
    color: var(--black-font-color);
    text-align: center;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.5px;

}

.invalid {
    border: 2px solid var(--red-color);
}

.auth-send {
    padding: 0px 12px;
    width: 123px;
    height: 36px;
    background: var(--red-color);
    color: var(--auth-button-font-color);
    border-width: 0px;
    border-radius: 4px;
    font-weight: 500;
    font-size: 14px;
    text-align: center;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    line-height: 36px;
}

/* START: Кнопка чата */

.chat-btn
{
  position: absolute;
  width: 72px;
  height: 72px;
  left: 1628px;
  top: 839px;
  border: 0px;
  background: var(--form-bg-color);
  backdrop-filter: blur(14px);
  border-radius: 54px;
}

.chat
{
  font-weight: 400;
  font-size: 32px;
  line-height: 20px;
  margin-top: 15px;
  color: var(--black-font-color);
}

/* END: Кнопка чата */

</style>
