<template>
  <div class="background">
    <div class="menu">
      <div class="title">飞花令小游戏</div>
      <div class="content">
        <div class="input-container">
          <input
            v-model="inputWord"
            @keydown.enter="startGame"
            placeholder="请输入一个汉字"
            class="input-word"
          />
          <button @click="startGame" class="start-button">开始</button>
          <p v-if="showPrompt" class="prompt">{{ promptMessage }}</p>
        </div>
        <div class="button-container">
          <button
            v-for="(word, index) in words"
            :key="index"
            @click="selectWord(index)"
            class="word-button"
            :style="{
              backgroundColor: index === selectedIndex ? '#555' : '#ccc',
            }"
          >
            {{ word }}
          </button>
        </div>
        <div class="note">
          <p>（点击以上任意字，或者在输入框中输入飞花令的关键字开始对战）</p>
        </div>
        <div class="rules-box">
          <div class="rules">
            <h2>飞花令规则：</h2>
            <p>1. 选择一个字开始游戏。</p>
            <p>2. 每个人依次说出一个有选定关键字的诗句。</p>
            <p>3. 不能说出之前说过的诗句。</p>
            <p>4. 时间限制内说不出来，视为失败。</p>
            <p>5. 重复的字可重新开始游戏。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      words: ["山", "水", "云", "风", "月", "花", "鸟", "石", "林", "草", "春"],
      selectedIndex: null,
      inputWord: "",
      showPrompt: false,
      promptMessage: "",
    };
  },
  methods: {
    goToFlower() {
      this.$router.push({ name: "Flower" });
    },
    selectWord(index) {
      // 切换字块的选中状态
      if (this.selectedIndex === index) {
        this.selectedIndex = null; // 如果当前字块已选中，则取消选中
      } else {
        this.selectedIndex = index; // 否则选中当前字块
      }
    },
    startGame() {
      // 开始游戏
      const input = this.inputWord.trim();
      if (input.length !== 1 && this.selectedIndex === null) {
        this.showPrompt = true;
        this.promptMessage = "请输入一个汉字";
      } else if (input.length !== 0 && this.selectedIndex !== null) {
        this.showPrompt = true;
        this.promptMessage = "只能选择一个方式进行游戏";
      } else {
        this.showPrompt = false;
        const selectedWord =
          input !== "" ? input : this.words[this.selectedIndex];
        console.log("开始对战，选择了字：" + selectedWord);

        this.$router.push({ name: "Flower", params: { word: selectedWord } });
      }
    },
  },
  mounted() {
    document.title = "飞花令";
  },
};
</script>

<style scoped>
.background {
  /* 背景样式 */
  background-image: url("../assets/bgi_Flower.jpg");
  background-size: cover;
  background-position: center;
  /* 其他样式 */
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu {
  text-align: center;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.content {
  text-align: center;
}

.input-container {
  margin-bottom: 20px;
}

.input-word {
  padding: 10px;
  font-size: 15px;
}

.start-button {
  padding: 10px 20px;
  font-size: 15px;
  cursor: pointer;
}

.prompt {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

.button-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.word-button {
  margin: 5px;
  padding: 10px 15px;
  font-size: 18px;
  background-color: #ccc;
  border: none;
  cursor: pointer;
}

.note {
  margin-top: 10px;
}

.rules-box {
  margin-top: 20px;
  border: 2px solid #ccc;
  border-radius: 10px;
  padding: 10px;
}

.rules {
  text-align: left;
}

.rules h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

.rules p {
  font-size: 16px;
  margin-bottom: 5px;
}
</style>
