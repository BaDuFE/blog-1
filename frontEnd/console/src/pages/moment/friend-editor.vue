<style>
</style>

<template>
  <el-card class="box-card">
    <el-form ref="form" :model="form" label-position="top">
      <el-form-item label="姓名">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="介绍">
        <el-input v-model="form.discription"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-input v-model="form.avatar"></el-input>
      </el-form-item>
      <el-form-item label="加分项">
        <el-input v-model="form.adminScore"></el-input>
      </el-form-item>
      <el-form-item label="github">
        <el-input v-model="form.github_username"></el-input>
      </el-form-item>
      <el-form-item label="url">
        <el-input v-model="form.url"></el-input>
      </el-form-item>
      <el-form-item label="isShow">
        <el-input v-model="form.isShow"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">
          <span v-if="id">修改</span>
          <span v-if="!id">发布</span>
        </el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>Î

<script>
function getFriendDtail (id) {
  return fetch(`/api/moment/friend/${id}`, {
    method: 'GET',
    credentials: 'same-origin'
  })
  .then(response => response.json())
}
export default {
  components: {
  },
  data () {
    return {
      id: null,
      // create edit
      mode: 'create',
      dateFormat: 'yyyy-MM-dd hh:mm:ss',
      inputVisible: false,
      inputValue: '',
      form: {
        adminScore: '',
        avatar: '',
        discription: '',
        github_username: '',
        url: '',
        id: '',
        isShow: 1,
        title: '',
        time_create: ''
      },

      userSelectorVisible: false
    }
  },
  created () {
    this.id = this.$route.params.id
    this.mode = this.id === 'new' ? 'create' : 'edit'
    if (this.mode === 'edit') {
      getFriendDtail(this.id).then(({code, detail = {}}) => {
        this.form.adminScore = detail.adminScore
        this.form.avatar = detail.avatar
        this.form.discription = detail.discription
        this.form.github_username = detail.github_username
        this.form.url = detail.url
        this.form.id = detail.id
        this.form.isShow = detail.isShow
        this.form.score = detail.score
        this.form.title = detail.title
        this.form.time_create = new Date(parseInt(detail.time_create, 10))
      })
    }
  },
  methods: {
    onSubmit () {
      let data = this.form
      let url
      let method
      if (this.mode === 'edit') {
        url = '/api/moment/friend/' + this.id
        method = 'PUT'
      } else {
        url = '/api/moment/friend/0'
        method = 'POST'
      }
      return fetch(url, {
        method,
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(() => {
        let msg = this.mode === 'edit' ? '更新成功！' : '发布成功'
        this.$alert(msg, {
          callback: action => {
            this.$router.push('/moment/friends')
          }
        })
      })
    },
    onCancel () {
      this.$router.push({
        path: '/moment/friends'
      })
    }
  }
}
</script>
