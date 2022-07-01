<template>
  <img 
    class="logo" 
    src="../public/logo.svg"
    alt="logo"
  >
  <Suspense>
    <router-view />
  </Suspense>
</template>

<style>
@import url('../src/styles/main.css');
@import url('../src/styles/bootstrap.min.css');
@import url('../src/styles/fonts.css');
</style>
