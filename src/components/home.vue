<template>
  <div class="body">
    <div class="form">
      <el-form ref="form" :model="form" label-width="50px">
        <el-form-item label="ID:">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="form.passWord"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="tologin">{{ login?'登录':'注册'}}</el-button>
          <el-button>取消</el-button>
        </el-form-item>
        <a @click = 'login = !login'>如果您没有账户,点击此处注册。</a>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  props: {},
  data() {
    return {
      form: {
        name: "",
       passWord:""
      },
      login:true
    };
  },
  watch: {},
  computed: {},
  methods: {
    toregist() {
      console.log(123)
     this.$post('login/createAccount',this.form).then(res => {
         console.log(res)
     }).catch(err => {
         console.log(err)
     })
    },
    tologin(){
      this.$post('login/getAccount',this.form).then(res => {
         console.log(res)
     }).catch(err => {
         console.log(err)
     })
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.body {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #eee;
}
.form {
  width: 50%;
  height: 400px;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  background-color: #fff;
  padding: 50px 10px;
}
</style>