<template>
  <div class="header">
    <div class="left">
      <div class="title">
        <el-icon>
          <ElemeFilled />
        </el-icon>
        <span>嗷嗷编程</span>
      </div>
      <el-button
        v-if="!$store.getters.isCollapse"
        color="#4338ca"
        icon="Fold"
        style="height: 100%; border-radius: 0; font-size: 16px"
        @click="hanndleIsCollapse"
      ></el-button>
      <el-button
        v-else
        color="#4338ca"
        icon="Expand"
        style="height: 100%; border-radius: 0; font-size: 16px"
        @click="hanndleIsCollapse"
      ></el-button>
      <el-button
        color="#4338ca"
        icon="Refresh"
        style="height: 100%; border-radius: 0; font-size: 16px"
      ></el-button>
    </div>
    <div class="right">
      <el-button
        color="#4338ca"
        icon="FullScreen"
        style="
          height: 100%;
          border-radius: 0;
          font-size: 16px;
          margin-right: 20px;
        "
      ></el-button>
      <el-avatar :size="30" :src="userInfo.avatar" style="margin-right: 10px" />
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{ userInfo.username
          }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="upPwd">修改密码</el-dropdown-item>
            <el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { ElMessage, ElMessageBox } from 'element-plus'
import { logOut } from '../../api/login'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const userInfo = computed(() => {
  return store.getters.userInfo
})

function handleCommand(val) {
  if (val === 'upPwd') handleUpdatePassword()
  if (val === 'loginOut') handleLoginOut()
}

// 修改密码
function handleUpdatePassword() {
  alert('修改密码')
}

// 退出登录
function handleLoginOut() {
  ElMessageBox.confirm('是否要退出登录？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      const res = await logOut()
      store.commit('login/SET_TOKEN')
      router.push('/login')
      ElMessage({
        type: 'success',
        message: res
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '退出登录失败'
      })
    })
}

// 关闭打开导航栏
function hanndleIsCollapse() {
  store.commit('login/UP_ISCOLLAPSE')
}
</script>

<style lang="scss" scoped>
.header {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left {
    display: flex;
    color: #fff;
    align-items: center;
    height: 100%;

    .title {
      width: 250px;
      justify-content: center;
      font-size: 23px;
      display: flex;
      align-items: center;

      .el-icon {
        margin-right: 5px;
      }
    }
  }

  .right {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 100%;

    .example-showcase,
    .el-dropdown-link {
      cursor: pointer;
      color: #fff;
      display: flex;
      align-items: center;
    }
  }
}
</style>
