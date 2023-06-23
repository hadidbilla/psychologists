<script setup>
import PlaySvgIcon from "assets/icons/PlaySvgIcon.vue";

const props = defineProps({
  psychologist: {
    type: Object,
    required: true
  }
})

const showAllDates = ref(false);

const displayedDates = ref(props.psychologist?.date.slice(0, 5));

const toggleDates = () => {
  if (showAllDates.value) {
    displayedDates.value = props.psychologist?.date.slice(0, 5);
  } else {
    displayedDates.value = props.psychologist?.date;
  }
  showAllDates.value = !showAllDates.value;
};
</script>

<template>
  <div class="border shadow p-3 text-center">
    <div class="flex justify-center">
      <div class="relative">
        <img :src="psychologist?.image" alt="" class="h-[150px] w-[150px] rounded-full object-cover">
        <PlaySvgIcon class="w-12 absolute bottom-0 right-0" />
      </div>
    </div>
    <h3 class="text-[#525859] text-2xl my-3">{{psychologist?.name}}</h3>
    <h4 class="text-[#CFB48E] text-xl capitalize">{{psychologist?.type}}</h4>
    <p class="text-[#525859] text-base mt-2">I am a supportive and encouraging practitioner with a passion for positive and preventative psychology.</p>
    <p class="text-[#525859] text-lg mt-4">Next session on Monday 9th Nov</p>
    <div class="flex justify-center gap-2 mt-3 px-2 flex-wrap">
      <button
          v-for="(date, index) in displayedDates"
          :key="index"
          :class="index === 0 ? 'w-[90px] text-center px-3 text-lg h-[50px] bg-[#2A373A] rounded leading-none text-[#8B9598]':'w-[90px] text-center px-3 text-lg h-[50px] bg-[#B37B37] rounded leading-none text-[#ECDFB5]'"

      >
        {{ date }}
      </button>
      <button
          v-if="!showAllDates"
          class="w-[90px] text-center  text-lg h-[50px] bg-transparent rounded leading-none text-[#CFB48E]"
          @click="toggleDates"
      >
        See More
      </button>
<!--      <button class="w-[90px] text-center px-3 text-lg h-[50px] bg-[#2A373A] rounded leading-none text-[#8B9598]">8am (+$25)</button>-->
<!--      <button class="w-[90px] text-center px-3 text-lg h-[50px] bg-[#B37B37] rounded leading-none text-[#ECDFB5]">9am</button>-->
<!--      <button class="w-[90px] text-center  text-lg h-[50px] bg-transparent rounded leading-none text-[#CFB48E]">See More</button>-->
    </div>
  </div>
</template>

<style scoped>

</style>