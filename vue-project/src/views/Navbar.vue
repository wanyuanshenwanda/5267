<template>
  <div class="navbar">
    <ul class="navbar-list">
      <li><router-link to="/">主页</router-link></li>
      <li><router-link to="/Login">登录</router-link></li>
      <li>我的</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: rgba(248, 249, 250, 0.1); /* Semi-transparent background */
  padding: 10px 0;
  display: flex;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* Ensure the navbar is above other content */
}
.navbar-list {
  display: flex;
  justify-content: space-around;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 600px;
}
.navbar-list li {
  margin: 0 15px;
  padding:5px;
  display: inline-block; /* 将列表项作为块状元素显示 */
  box-sizing: border-box; /* 确保填充不会改变元素的最终大小 */
  cursor: pointer;
}
.navbar-list a {
  display: block; /* 设置a标签为块状元素填满li */
  text-decoration: none;
  color: #4e4e4e;
  height: 100%; /* 设置高度为100%，确保a标签填满li */
  width: 100%; /* 设置宽度为100%，确保a标签填满li */
}
.navbar-list a:hover {
  color: #4e4e4e;
}
</style>
