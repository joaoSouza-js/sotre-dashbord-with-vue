<template>
    <button :type="type" :class="classes" @click="handleClick">
      <slot></slot>
    </button>
  </template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'button',
  },
  classes: {
    type: String,
    default: '',
  },
});

const handleClick = () => {
  // Handle button click here
};
</script>

// Using options API
<script>
export default {
  props: {
    type: {
      type: String,
      default: 'button',
    },
    classes: {
      type: String,
      default: '',
    },
  },
  methods: {
    handleClick() {
      // Handle button click here
    },
  },
};
</script>

<style scoped>
button {
  @apply bg-black
            rounded-full
            py-4
            px-12
            mt-8
            text-white
            transition-all;
}
button:hover {
  @apply bg-black/80
            rounded-full
            py-4
            px-12
            mt-8
            text-white;
}

</style>