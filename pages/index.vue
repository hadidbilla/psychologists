<script setup>
import PsychologistCard from "@/components/cards/PsychologistCard.vue";
import { onMounted, reactive, ref, watch } from "vue";
import { useUsersStore } from "@/stores/users";

const router = useRouter();
const usersStore = useUsersStore();
const name = ref("");
const queryParamList = ref([]);
const filterData = ref([]);
const types = reactive({
  options: [
    {
      label: "Type",
      value: "",
    },
    {
      label: "Psychologist",
      value: "psychologist",
    },
    {
      label: "Psychiatrist",
      value: "psychiatrist",
    },
    {
      label: "Psychotherapist",
      value: "psychotherapist",
    },
  ],
  selected: "",
});

const specialties = reactive({
  options: [
    {
      label: "Specialty",
      value: "",
    },
    {
      label: "Anxiety",
      value: "anxiety",
    },
    {
      label: "Depression",
      value: "depression",
    },
    {
      label: "Relationship",
      value: "relationship",
    },
  ],
  selected: "",
});

const gender = reactive({
  options: [
    {
      label: "Gender",
      value: "",
    },
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
    {
      label: "Other",
      value: "other",
    },
  ],
  selected: "",
});

const language = reactive({
  options: [
    {
      label: "Language",
      value: "",
    },
    {
      label: "English",
      value: "english",
    },
    {
      label: "Spanish",
      value: "spanish",
    },
    {
      label: "French",
      value: "french",
    },
  ],
  selected: "",
});

let users = reactive([]);
//set filters query params on select change one by one
const selectChange = (value, param) => {
  if (value) {
    queryParamList.value.push(param);
    // /specialists?practice_type=Coaching&standard_fee_int=50%20TO%20100&gender=female
    const query = { ...router.currentRoute.value.query };
    query[param] = value;
    router.push({ query });
  } else {
    const query = { ...router.currentRoute.value.query };
    queryParamList.value = queryParamList.value.filter(
      (item) => item !== param
    );
    delete query[param];
    router.push({ query });
  }
};

const selectName = (value) => {
  if (value) {
    const query = { ...router.currentRoute.value.query };
    query["name"] = value;
    router.push({ query });
  } else {
    const query = { ...router.currentRoute.value.query };
    delete query["name"];
    router.push({ query });
  }
};

const resetField = () => {
  router.push({ query: {} });
  types.selected = "";
  specialties.selected = "";
  gender.selected = "";
  language.selected = "";
  name.value = "";
};

watch(
  () => router.currentRoute.value.query,
  (query) => {
    filterData.value = users.filter((user) => {
      let isMatch = true;
      for (const key in query) {
        if (key === "name") {
          isMatch = user.name.toLowerCase().includes(query[key].toLowerCase());
        } else {
          isMatch = user[key] === query[key];
        }
        if (!isMatch) {
          break;
        }
      }
      return isMatch;
    });
  },
  { immediate: true }
);

const fetchUsers = async () => {
  try {
    let res = await usersStore.fetchUsers();
    users = res;
    filterData.value = users;
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  const query = { ...router.currentRoute.value.query };
  name.value = query.name || "";
  queryParamList.value = Object.keys(query).filter((key) => key !== "name");
  types.selected = query.type || "";
  specialties.selected = query.specialty || "";
  gender.selected = query.gender || "";
  language.selected = query.language || "";
  fetchUsers();
});
</script>

<template>
  <div class="container px-[4%]">
    <h2 class="text-2xl mt-5 text-[#555a5b]">Psychologists available (36)</h2>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 items-center mt-4 my-10 gap-4"
    >
      <div class="flex flex-col">
        <select
          @change="selectChange(types.selected, 'type')"
          name="type"
          id="type"
          v-model="types.selected"
          class="border border-gray-300 rounded-md p-2"
        >
          <option
            v-for="(option, i) in types.options"
            :key="i"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </div>
      <div class="flex flex-col">
        <select
          @change="selectChange(specialties.selected, 'specialty')"
          name="specialty"
          id="specialty"
          v-model="specialties.selected"
          class="border border-gray-300 rounded-md p-2"
        >
          <option
            v-for="(option, i) in specialties.options"
            :key="i"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </div>
      <div class="flex flex-col">
        <select
          @change="selectChange(gender.selected, 'gender')"
          name="specialty"
          id="specialty"
          v-model="gender.selected"
          class="border border-gray-300 rounded-md p-2"
        >
          <option
            v-for="(option, i) in gender.options"
            :key="i"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </div>
      <div class="flex flex-col">
        <select
          @change="selectChange(language.selected, 'language')"
          name="specialty"
          id="specialty"
          v-model="language.selected"
          class="border border-gray-300 rounded-md p-2"
        >
          <option
            v-for="(option, i) in language.options"
            :value="option.value"
            :key="i"
          >
            {{ option.label }}
          </option>
        </select>
      </div>
      <div class="">
        <input
          name="name"
          id="name"
          v-model="name"
          @input="selectName($event.target.value)"
          type="text"
          placeholder="Name"
          class="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>
      <div class="flex flex-col">
        <button @click="resetField" class="p-0 flex">x Reset</button>
      </div>
    </div>
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <template v-if="filterData.length">
        <PsychologistCard
          v-for="user in filterData"
          :psychologist="user"
          :key="user.name"
        />
      </template>
      <template v-else>
        <div class="col-span-4 text-center">No data found</div>
      </template>
    </div>
    <!--    <PsychologistCard/>-->
  </div>
</template>
