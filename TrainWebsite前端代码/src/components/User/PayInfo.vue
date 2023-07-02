<!-- <template>
  <div class="payment-container">
    <h2 class="payment-title">支付页面</h2>
    <div class="payment-form">
      <div class="payment-methods">
        <h3 class="payment-methods-title">选择支付方式</h3>
        <div class="payment-method">
          <input
            type="radio"
            id="credit-card"
            value="credit-card"
            v-model="selectedMethod"
          />
          <label for="credit-card">信用卡</label>
        </div>
        <div class="payment-method">
          <input
            type="radio"
            id="paypal"
            value="paypal"
            v-model="selectedMethod"
          />
          <label for="paypal">PayPal</label>
        </div>
      </div>
      <div v-if="selectedMethod === 'credit-card'" class="credit-card-form">
        <h3 class="credit-card-title">信用卡支付</h3>
        <div class="credit-card-details">
          <div class="form-group">
            <label for="card-number">卡号</label>
            <input
              type="text"
              id="card-number"
              v-model="cardNumber"
              placeholder="请输入卡号"
            />
          </div>
          <div class="form-group">
            <label for="expiry-date">有效期限</label>
            <input
              type="text"
              id="expiry-date"
              v-model="expiryDate"
              placeholder="MM/YY"
            />
          </div>
          <div class="form-group">
            <label for="cvv">CVV</label>
            <input type="text" id="cvv" v-model="cvv" placeholder="请输入CVV" />
          </div>
        </div>
      </div>
      <div v-else-if="selectedMethod === 'paypal'" class="paypal-form">
        <h3 class="paypal-title">PayPal支付</h3>
        
      </div>
      <button class="pay-button">立即支付</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedMethod: "credit-card",
      cardNumber: "",
      expiryDate: "",
      cvv: ""
    };
  }
};
</script>

<style>
.payment-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.payment-title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.payment-methods-title,
.credit-card-title,
.paypal-title {
  font-size: 18px;
  margin-bottom: 10px;
}

.payment-methods {
  margin-bottom: 20px;
}

.payment-method {
  margin-bottom: 10px;
}

.credit-card-form,
.paypal-form {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 10px;
}

.pay-button {
  display: block;
  width: 100%;
  background-color: #4caf50;
  color: white;
  font-size: 16px;
  padding: 10px;
  border: none;
  cursor: pointer;
}

.pay-button:hover {
  background-color: #45a049;
}
</style> -->

<template>
  <div class="login_container">
    <div class="login_box"></div>
  </div>
</template>

<script>
export default {};
</script>

<!-- 支持less语法格式，scoped代表样式只在本组件起作用 -->
<style lang="less" scoped>
.login_container {
  //background-image: url();
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 500px;
  height: 500px;
  background-color: #fff;
  border-radius: 3px; //圆角效果
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
