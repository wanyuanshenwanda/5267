<template>
  <div class="bigbox">
    <div class="text">
      <h2>拾遗</h2>
      <h4>保护|传承|创新</h4>
      <p>感受诗词中传统文化的魅力</p>
    </div>
    <div id="nav">
      <ul class="menu">
        <li @click="goToFlowerPage">
          <span>飞花令</span><img src="../assets/bgi_Flower.jpg" alt="" />
        </li>
        <li><span>传统建筑</span><img src="../assets/col_2.jpeg" alt="" /></li>
        <li><span>传统文化</span><img src="../assets/3.jpeg" alt="" /></li>
        <li><span>传统美食</span><img src="../assets/4.jpeg" alt="" /></li>
        <li><span>传统工艺</span><img src="../assets/5.jpeg" alt="" /></li>
        <li><span>传统戏曲</span><img src="../assets/login.jpeg" alt="" /></li>
        <li><span>传统文学</span><img src="../assets/7.jpeg" alt="" /></li>
        <li><span>传统礼仪</span><img src="../assets/8.jpeg" alt="" /></li>
        <li><span>传统精神</span><img src="../assets/9.jpeg" alt="" /></li>
      </ul>
    </div>
    <div id="content"></div>
    <div class="footer">
      <h5>制作：5267交互组</h5>
      <h6>联系方式：2562160171@qq.com</h6>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainPage",
  methods: {
    goToFlowerPage() {
      this.$router.push({ name: "FlowerPage" });
    },
  },
  mounted() {
    document.title = "主页";
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
.bigbox {
  height: 100%;
  width: 100%;
  margin: 0;
  background: url("../assets/bgi_MainPage02.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
}

.text {
  margin-top: 100px;
  margin-left: 250px;
  font-family: "楷体", serif;
}
h2 {
  font-size: 45px;
}
h4 {
  /* margin-top:10px; */
  font-size: 35px;
  font-weight: initial;
}
h2,
h4 {
  margin: 5px;
}
#nav .menu {
  margin-top: 350px;
}
.menu li {
  /* display: flex;
    flex:1; */
  list-style: none;
  float: left;
  width: 100px;
  height: 600px;
  overflow: hidden;
  margin: 0;
  cursor: pointer;
  transition: width 0.4s ease-in-out;
  border-radius: 15px;
}
.menu li:hover {
  width: 400px; /* 鼠标悬停时的宽度 */
  transition-delay: 0.2s;
}
.menu li > span {
  position: absolute;
  width: 100px;
  height: 600px;
  writing-mode: tb-rl;
  font-size: 30px;
  font-family: "楷体", serif;
  line-height: 150px;
  color: rgb(83, 15, 15);
  overflow: hidden;
}
.menu li > img {
  width: 400px;
  height: 600px;
  opacity: 0.5;
}
.menu li:hover > img {
  opacity: 1;
}

.speak {
  /* display: block; */
  position: relative;
  width: 95%;
  height: 680px;
  margin-top: 1000px;
  margin-left: 2%;
}
.top {
  background: rgba(237, 233, 233, 0.5);
  border: 1px solid #232323;
  border-radius: 20px;
}
.top,
.bottom {
  width: 95%;
  height: 300px;
  margin-bottom: 20px;
}

.btn {
  display: inline-block;
  position: absolute;
  right: 50px;
}
input[type="button"] {
  display: inline-flex;
  width: 70px;
  height: 30px;
  margin-right: 30px;
  border-radius: 10px;
  text-align: center;
  line-height: 30px;
  padding-left: 17px;
  border-width: 1px;
}
.footer {
  text-align: right;
  line-height: 20px;
  padding: 10px;
  font-family: "楷体", serif;
  font-size: 20px;
  font-weight: initial;
  position: fixed;
  right: 0;
  bottom: 0;
}
input[type="button"]:hover {
  background-color: rgb(125, 98, 98);
}
.bottom {
  width: 50%;
  border: 4px solid rgb(155, 89, 89);
  margin: 0 auto;
  padding: 10px 30px;
  height: 350px;
  box-shadow: 3px 5px 3px #878787;
}
h3 {
  margin: 10px;
  font-size: 35px;
  text-align: center;
  text-shadow: 2px 3px 3px #878787;
  font-family: "楷体", serif;
}
.bottom img {
  width: 30px;
  height: 30px;
  margin: 10px 0;
}
#tex {
  width: 100%;
  margin: 10px 0;
}
.count {
  float: right;
  color: silver;
}
#btn {
  width: 50px;
  height: 25px;
  background: rgb(197, 117, 107);
  color: white;
  border-radius: 5px;
  outline: none;
  border: 0px;
  line-height: 25px;
}
#btn a {
  text-decoration: none;
}
#content {
  margin: 50px 0;
}
.list {
  padding: 5px;
  height: 80px;
  border-bottom: 1px solid black;
  position: relative;
}
.list button {
  display: none;
  position: absolute;
  right: 10px;
  top: 30px;
  padding: 10px;
  background: rgb(156, 75, 48);
  color: white;
  border-radius: 5px;
  outline: none;
  border: 0px;
}
</style>