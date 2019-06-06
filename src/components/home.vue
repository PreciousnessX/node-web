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
          <el-button type="primary" @click="islogin?login():regist()">{{ islogin?'登录':'注册'}}</el-button>
          <el-button>取消</el-button>
        </el-form-item>
        <a @click="islogin = !islogin" class="link">如果您没有账户,点击此处注册。</a>
        <div>{{islogin}}</div>
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
        passWord: ""
      },
      islogin: true
    };
  },
  watch: {},
  computed: {},
  methods: {
    regist() {
      let that = this;
      console.log({'account':this.form})
      this.$post("login/createAccount", { 'account': that.form })
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    login() {
      const that = this;
      that.$post('/getkey').then(function(data){
       const {key,pubkey} = data
       // 加密
       let account = that.$utils.enRSA(pubkey,that.form)
       // 生成密钥对
       const RSAkeys = that.$utils.creatRSA()
       // 将公钥存在localstorage中
       localStorage.setItem('prikey',RSAkeys.prikey)
       that.$post("login/getAccount", { key:key,account: account,pubkey: RSAkeys.pubkey})
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.log(data);
        });
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
.link {
  color: #5b99fd;
  cursor: pointer;
}
</style>