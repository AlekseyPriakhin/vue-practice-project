<template>
  <div :class="style['background']">
    <LoginForm />
    <Button 
      :name="chatBtnName"
      class="material-icons"
      :class="[style['chat-btn'],style['chat']]"
    />
  </div>
</template>


<script setup>

import { useCssModule} from 'vue'

import Button from '../components/ButtonComponent.vue'
import LoginForm from '../components/LoginForm.vue'

const style = useCssModule();

const chatBtnName = "chat";

</script>


<style module>

:root
{
  --chat-btn-bg-color:rgba(255, 255, 255, 0.67);
}

.background {
    height: 100vh;
    padding-top: 334px;
    background: url("../../public/login-background.jpg") no-repeat center;
    background-size: cover;
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
  background: var(--chat-btn-bg-color);
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
