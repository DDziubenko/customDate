<template lang="pug">
h1 Date Methods
</template>

<script lang="ts" setup>
import { customDate } from "@/composables/classDate";

const gg = new customDate("2004-09-24");
console.log(gg.current, gg.getDatePart("d"));
</script>

<style scoped lang="scss">
h1 {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
