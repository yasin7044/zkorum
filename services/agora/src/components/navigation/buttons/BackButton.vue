<template>
  <ZKButton
    icon="mdi-arrow-left"
    text-color="color-text-strong"
    flat
    @click="buttonClicked()"
  />
</template>

<script setup lang="ts">
import ZKButton from "src/components/ui-library/ZKButton.vue";
import { useGoBackButtonHandler } from "src/utils/nav/goBackButton";

const goBackButtonHandler = useGoBackButtonHandler();

function buttonClicked() {
  goBackButtonHandler.goBack();
}
</script>

<style scoped></style>
