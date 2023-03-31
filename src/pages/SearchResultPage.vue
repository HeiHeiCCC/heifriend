<template>
  <user-card-list :user-list="userList"/>

  <van-empty v-if="!userList || userList.length < 1" description="搜索结果为空" />

</template>

<script setup>
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import myAxios from "../plugins/myAxios.ts";
import qs from "qs";
import Qs from "qs";
import {showFailToast, showSuccessToast, Toast} from "vant";
import UserCardList from "../components/UserCardList.vue";

const route = useRoute();

const userList = ref([])

const {tags} = route.query;

onMounted(async () => {
  const  userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagNameList: tags
     },
    paramsSerializer: {
      serialize: function (params) {
        return Qs.stringify(params, {arrayFormat: 'repeat'})
      }
    },
  })
      .then(function (response) {
        // 处理成功情况
        console.log('/user/search/tags success', response);
        showSuccessToast('加载成功');
        return response?.data
      })
      .catch(function (error) {
        // 处理错误情况
        console.log('/user/search/tags error', error);
        showFailToast('加载失败');
      })

  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags)
      }
    })
    userList.value = userListData;
  }
})

</script>

<style scoped>

</style>