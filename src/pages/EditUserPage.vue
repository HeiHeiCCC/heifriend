<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="editUser.currentValue"
          :name="editUser.editKey"
          :label="editUser.editName"
          :placeholder="`请输入${editUser.editName}`"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>


</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast, Toast} from "vant";
import {getCurrentUser} from "../services/user";

const rout = useRoute();
const router = useRouter();
const editUser = ref({
  editKey: rout.query.editKey,
  editName: rout.query.editName,
  currentValue: rout.query.currentValue
})




const onSubmit = async (values) => {

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    showFailToast('用户未登录');
    return;
  }

  const res = await myAxios.post("/user/update", {

    'id': currentUser.id,
    [editUser.value.editKey]: editUser.value.currentValue,
  })

  if (res.code === 0 && res.data > 0) {
    showSuccessToast('修改成功');
    router.back();
  } else {
    showFailToast('修改失败');
  }
};
</script>

<style scoped>

</style>