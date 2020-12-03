<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li v-for="tab in menutabs" :key="tab.id" @click="toggleMenutab(tab)" :class="{ selected: tab.selected }">
          {{ tab.text }}
        </li>
      </ul>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-form"
        size="medium"
      >
        <el-form-item prop="username" class="form-item">
          <label for="username">账号</label>
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pass" class="form-item">
          <label for="pass">密码</label>
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item prop="checkPass" class="form-item" v-if="register">
          <label for="checkPass">重复密码</label>
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item prop="validCode" class="form-item">
          <label for="validCode">验证码</label>
          <el-row :gutter="10">
            <el-col :span="14"
              ><el-input v-model.number="ruleForm.validCode"></el-input
            ></el-col>
            <el-col :span="10"
              ><el-button
                type="success"
                @click="submitForm('ruleForm')"
                class="block"
                >获取验证码</el-button
              ></el-col
            >
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            class="login-btn block"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {validateEmail,validatePassword,validateVCode,stripscript} from '@/utils/validate';
export default {
  name: "login",
  data() {
    var menutabs = [
      {
        text: "登录",
        type: "login",
        selected: true,
      },
      {
        text: "注册",
        type: "register",
        selected: false,
      },
    ];

    var validateUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if(!validateEmail(value)) {
        callback(new Error("用户名格式有误！"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      this.ruleForm.pass=stripscript(value);
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if(!validatePassword(value)){
        callback(new Error("密码为6至20位数字+字母"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if(!this.register) {callback();}
      this.ruleForm.checkPass=stripscript(value);
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (this.ruleForm.checkPass !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    var validateCode=(rule,value,callback)=>{
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (!validateVCode(value)) {
        callback(new Error("验证码格式有误！"));
      } else {
        callback();
      }
      
    }

    return {
      menutabs: menutabs,
      ruleForm: {
        username:"",
        pass: "",
        checkPass: "",
        validCode: "",
      },
      rules: {
        username: [{ validator: validateUserName, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        validCode: [{ validator: validateCode, trigger: "blur" }],
      },
    };
  },
  methods: {
    toggleMenutab(tab) {
      this.menutabs.forEach((item, index) => (item.selected = false));
      tab.selected = true;
      this.resetForm("ruleForm");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },

  computed:{
    register(){
      var isRegister=false;
      this.menutabs.forEach((item,index)=>{
        if(item.selected && item.type==="register"){
          isRegister=true;
        }
      });

      return isRegister;
    }
  }
};
</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}

.login-wrap {
  width: 330px;
  margin: auto;
}

.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }

  .selected {
    background-color: rgba($color: #000000, $alpha: 0.1);
  }
}

.login-form {
  label {
    display: block;
    font-size: 14px;
    margin-bottom: 3px;
    color: #fff;
  }

  .form-item {
    margin-bottom: 13px;
  }

  .block {
    display: block;
    width: 100%;
  }

  .login-btn {
    margin-top: 19px;
  }
}
</style>
