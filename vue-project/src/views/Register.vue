<template>
  <div class="background">
    <div class="container">
      <div class="header">
        <h1>注册</h1>
      </div>
      <div class="main">
        <form>
          <span>
            <label>
              <input type="text" placeholder="账号" />
            </label> </span
          ><br />
          <span>
            <label>
              <input type="password" placeholder="密码" />
            </label> </span
          ><br />
          <button>注 册</button> <br />
          <a class="tail" @click="goToLogin">登录</a>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Register",
  data() {
    return {};
  },
  methods: {
    goToLogin() {
      this.$router.push({ name: "Login" });
    },
  },
  mounted() {
    document.title = "注册";
  },
};
</script>
<style scoped>
.background {
  /* 背景样式 */
  background-image: url("../assets/bgi_Login.jpg");
  background-size: cover;
  background-position: center;
  /* 其他样式 */
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  width: 380px;
  margin: 7% auto;
  border-radius: 25px;
  background-color: rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 17px #333;
}

.header {
  text-align: center;
  padding-top: 75px;
}

.header h1 {
  color: #c5bebe;
  font-size: 45px;
  margin-bottom: 80px;
}

.main {
  text-align: center;
}

.main input,
button {
  width: 300px;
  height: 40px;
  border: none;
  outline: none;
  padding-left: 40px;
  box-sizing: border-box;
  font-size: 15px;
  color: #333;
  margin-bottom: 40px;
}

.main button {
  padding-left: 0;
  background-color: #83acf1;
  letter-spacing: 1px;
  font-weight: bold;
  margin-bottom: 70px;
}

.main button:hover {
  box-shadow: 2px 2px 5px #555;
  background-color: #7799d4;
}

.main input:hover {
  box-shadow: 2px 2px 5px #555;
  background-color: #ddd;
}

.main span {
  position: relative;
}

.tail {
  color: #c5bebe;
  cursor: pointer;
}
</style>