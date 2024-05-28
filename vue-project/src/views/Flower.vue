<template>
  <div
    class="bigbox"
    :style="{ backgroundImage: `url(${backgroundImageUrl})` }"
  >
    <button @click="goBack" class="back-button">返回</button>
    <div class="main-container">
      <div class="left-box">
        <div v-for="(message, index) in leftBoxMessages" :key="'left-' + index">
          {{ message }}
        </div>
      </div>
      <div class="chat-container">
        <div class="messages-container" ref="messagesContainer">
          <div
            class="chat-bubble"
            :class="message.isReceived ? 'received' : 'sent'"
            v-for="(message, index) in messages"
            :key="index"
          >
            {{ message.text }}
          </div>
        </div>
        <div class="input-container">
          <input
            v-model="newMessage"
            @keyup.enter="sendMessage"
            placeholder="请输入诗句"
            class="chat-input"
            :disabled="!isUserTurn"
          />
          <button
            @click="sendMessage"
            class="send-button"
            :disabled="!isUserTurn"
          >
            Send
          </button>
        </div>
        <div class="countdown-timer">
          第{{ messageCount }}回合，请说出一句带有 {{ word }} 的诗句 Time left:
          {{ countdown }}s
        </div>
      </div>
      <div class="right-box">
        <div
          v-for="(message, index) in rightBoxMessages"
          :key="'right-' + index"
        >
          {{ message }}
        </div>
      </div>
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-content">
          <h2>您输了</h2>
          <button @click="closeModal">知道了</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import bgi from "../assets/bgi_Flower.jpg";

export default {
  props: {
    word: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      newMessage: "",
      messages: [],
      countdown: 30,
      timer: null,
      isUserTurn: true,
      leftBoxMessages: [],
      rightBoxMessages: [],
      showModal: false,
      selectedWord: "",
      needReset: false,
      messageCount: 0,
      backgroundImageUrl: bgi, // 动态加载图片
      thinkingMessage: "思考中……",
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1); // 返回上一页
    },
    async sendMessage() {
      if (this.newMessage.trim() !== "" && this.isUserTurn) {
        // Add the user's message
        const userMessage = this.newMessage.trim();
        this.messages.push({ text: this.newMessage.trim(), isReceived: false });
        this.resetCountdown();
        this.isUserTurn = false;
        console.log(userMessage);
        this.messageCount++;
        // 显示“思考中……”
        this.messages.push({ text: this.thinkingMessage, isReceived: true });
        this.$nextTick(() => {
          this.scrollToBottom();
        });
        // Send the user's message to the backend
        await axios
          .post(
            "http://localhost:8080/poem/interact",
            {
              userAnswer: userMessage,
              keyword: this.selectedWord,
              needReset: this.needReset,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            const { code, message, data } = response.data;
            if (code === 0) {
            
            // 检查是否为第五次发送消息
            if (this.messageCount === 1) {
              this.updateBackgroundImage();
            }
        
              this.messages.pop();
              this.messages.push({
                text: message,
                isReceived: true,
              });
              this.$nextTick(() => {
                this.scrollToBottom();
              });
              // Display the response in the left and right boxes
              this.leftBoxMessages = [
                data[1].p_title,
                data[1].p_author_name,
                data[1].p_paragraph,
              ];

              this.rightBoxMessages = [
                data[0].p_title,
                data[0].p_author_name,
                data[0].p_paragraph,
              ];
            } else if (code === 1) {
              console.log(message);
            } else {
              console.log("hi");
            }
            this.isUserTurn = true;
            this.startCountdown();
            this.needReset = false;
            this.newMessage = "";
            // 发送消息计数增加
            
            
          });
        // Simulate receiving a response from the backend
      }
    },

    async updateBackgroundImage() {
  
      try {
        const response = await axios.post(
          "http://localhost:8080/ai/img",
          {
            content: this.newMessage.trim(),
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const { code, message, data } = response.data;
        if (code === 0) {
          this.backgroundImageUrl = data;
          console.log("img接口code=0");
        } else {
          console.log(message);
        }
      } catch (error) {
        console.error("Error updating background image:", error);
      }
    },
    startCountdown() {
      this.countdown = 30;
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) {
          clearInterval(this.timer);
          this.showModal = true;
        }
      }, 1000);
    },
    resetCountdown() {
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.countdown = 30;
    },
    scrollToBottom() {
      const container = this.$refs.messagesContainer;
      container.scrollTop = container.scrollHeight;
    },
    closeModal() {
      this.showModal = false;
      this.resetCountdown();
      this.startCountdown;
      window.location.reload();
    },
  },
  mounted() {
    this.selectedWord = this.word;
    this.needReset = true;
    this.scrollToBottom();
    this.startCountdown();
  },
};
</script>

<style scoped>
.bigbox {
  background: no-repeat center center fixed;
  background-size: cover;
  height: 100vh;
  width: 100vw;
  display: flex;
  overflow: hidden;
  background-position: center;
  position: relative;
}
.back-button {
  position: absolute;
  top: 20px;
  left: 65px;
  padding: 10px 20px;
  font-size: 16px;
  color: #000000;
  background-color: rgba(255, 255, 255, 0.3);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.back-button:hover {
  background-color: rgba(255, 255, 255, 0.5);
}
.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  height: 100%;
  width: 100%;
}

.left-box,
.right-box,
.chat-container {
  background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent background */
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow-y: auto;
  padding: 10px;
}

.left-box,
.right-box {
  width: 150px;
  height: 150px;
  margin: 0 10px;
  display: flex;
  align-self: center;
}

.chat-container {
  width: 1000px;
  height: 600px;
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
}

.chat-bubble {
  padding: 10px;
  border-radius: 15px;
  margin: 5px 0;
  max-width: 80%;
}

.sent {
  background-color: #007bff;
  color: white;
  align-self: flex-end; /* Align sent messages to the right */
}

.received {
  background-color: #f1f1f1;
  color: black;
  align-self: flex-start; /* Align received messages to the left */
}

.input-container {
  display: flex;
}

.chat-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
}

.send-button {
  padding: 10px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.send-button:disabled {
  background-color: #999;
  cursor: not-allowed;
}

.send-button:hover:enabled {
  background-color: #0056b3;
}

.countdown-timer {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 16px;
  font-weight: bold;
}

.box-message {
  background-color: #e0e0e0;
  padding: 5px;
  margin-bottom: 5px;
  border-radius: 5px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}
</style>