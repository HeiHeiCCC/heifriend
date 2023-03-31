<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>

  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds.length ===0">请选择标签</div>

  <van-row gutter="20">

    <van-col v-for="tag in activeIds">
      <van-tag  closeable size="medium" type="primary" @close="doClose(tag)">
        {{ tag }}
      </van-tag>
    </van-col>

  </van-row>


  <van-divider content-position="left">选择标签</van-divider>

  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />

  <van-button block type="primary" @click="doSearchResult">搜索</van-button>

</template>

<script setup>
import { ref } from 'vue';
import { Toast } from 'vant';
import {useRouter} from "vue-router";

const router = useRouter()
const searchText = ref('');


const originTagList = [
  {
    text: '浙江',
    children: [
      { text: '杭州', id: 'java' },
      { text: '温州', id: 2 },
      { text: '宁波', id: 3},
    ],
  },
  {
    text: '江苏',
    children: [
      { text: '南京', id: 4 },
      { text: '无锡', id: 5 },
      { text: '徐州', id: 6 },
    ],
  },
  { text: '福建',
    children: [
      { text: '厦门', id: 7 },
      { text: '泉州', id: 8 },
      { text: '莆田', id: 9 },
    ],
  },
];


let tagList = ref(originTagList);

//搜索过滤
const onSearch = (val) => {
  tagList.value = originTagList.map(parentTag => {
    const tempChildren = [...parentTag.children];
    const tempParentTag = {...parentTag};
    tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value))
    return tempParentTag;
  });

}
const onCancel = () => {
  searchText.value = '';
  tagList.value = originTagList;
};
//已选中的标签
const activeIds = ref([]);
const activeIndex = ref(0);

//移除标签
const doClose = (tag) => {
  activeIds.value = activeIds.value.filter(item => {
    return item !== tag
  })
}

const doSearchResult = () => {
  router.push({
    path: 'user/list',
    query: {
      tags: activeIds.value
    }
  })
}

</script>

<style scoped>

</style>