<template>
<div class="bigbox">
    <button @click="goBack" class="back-button">返回</button>
    <div class="main-container">
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
            <textarea
    v-model="newMessage"
    @keyup.enter="sendMessage"
    placeholder="请输入您的问题"
    class="chat-input"
    :disabled="!isUserTurn"
    ref="input"
    @input="adjustTextareaHeight"
  ></textarea>
        <button
            @click="sendMessage"
            class="send-button"
            :disabled="!isUserTurn"
        >
            Send
        </button>
        </div>
    </div>
    </div>
</div>
</template>

<script>
import axios from "axios";

export default {
    name: "Ask",
data() {
    return {
    newMessage: "",
    messages: [],
    isUserTurn: true,
    needReset: false,
    };
},
watch: {
isUserTurn(newValue) {
    if (newValue) {
    this.$nextTick(() => {
        this.$refs.input.focus();
    });
    }
}
},
methods: {
    goBack() {
    this.$router.go(-1); // 返回上一页
    },
    adjustTextareaHeight(event) {
    const textarea = event.target;
    textarea.style.height = 'auto'; // 重置高度
    textarea.style.height = textarea.scrollHeight + 'px'; // 根据内容设置高度
  },
    async sendMessage() {
    if (this.newMessage.trim() !== "" && this.isUserTurn) {
        // Add the user's message
        const userMessage = this.newMessage.trim();
        this.messages.push({ text: this.newMessage.trim(), isReceived: false });
        this.isUserTurn = false;
        this.newMessage = "";
        console.log(userMessage);
         // 显示“思考中……”
         this.messages.push({ text: "组织语言中......", isReceived: true });
        this.$nextTick(() => {
          this.scrollToBottom();
        });
        // Send the user's message to the backend
        await axios
        .post(
            "http://localhost:8080/ai/interact",
            {
            content: userMessage,
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
                this.messages.pop();
            this.messages.push({
                text: data,
                isReceived: true,
            });
            this.$nextTick(() => {
                this.scrollToBottom();
            });
            
            } else if (code === 1) {
            console.log(message);
            } else {
            console.log("hi");
            }
            this.isUserTurn = true;
            this.needReset = false;
        });

    }
    },
    scrollToBottom() {
      const container = this.$refs.messagesContainer;
      container.scrollTop = container.scrollHeight;
    },
},
mounted() {
    this.scrollToBottom();
    document.title = "有什么可以帮助您的?";
    this.needReset = true;
},
};
</script>

<style scoped>
.bigbox {
background: url("../assets/bgi_Ask.jpg")no-repeat center center fixed;
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
top: 60px;
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

.chat-container {
background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent background */
border: 1px solid #ccc;
border-radius: 5px;
overflow-y: auto;
padding: 10px;
width: 800px;
height: 700px;
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
  resize: none; /* 禁止调整大小 */
  box-sizing: border-box; /* 边框和内边距包含在宽高内 */
  overflow: hidden; /* 隐藏滚动条 */
  min-height: 50px; /* 最小高度 */
  max-height: 100px; /* 最大高度 */
  font-size: 16px;
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


</style>