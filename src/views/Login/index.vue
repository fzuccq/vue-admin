<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li v-for="tab in menutabs" :key="tab.id" @click="toggleMenutab(tab)" :class="{ selected: tab.selected }">
          {{ tab.text }}
        </li>
      </ul>
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        class="login-form"
        size="medium"
      >
        <el-form-item prop="username" class="form-item">
          <label for="username">账号</label>
          <el-input
            id="username"
            type="text"
            v-model="loginForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pass" class="form-item">
          <label for="pass">密码</label>
          <el-input
            id="pass"
            type="password"
            v-model="loginForm.pass"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item prop="checkPass" class="form-item" v-if="register">
          <label for="checkPass">重复密码</label>
          <el-input
            id="checkPass"
            type="password"
            v-model="loginForm.checkPass"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item prop="validCode" class="form-item">
          <label for="validCode">验证码</label>
          <el-row :gutter="10">
            <el-col :span="14"
              ><el-input id="validCode" v-model="loginForm.validCode"></el-input
            ></el-col>
            <el-col :span="10"
              ><el-button
                type="success"
                :disabled="!codeButtonState.enabled"
                @click="btnGetSms()"
                class="block"
                >{{codeButtonState.text}}</el-button
              ></el-col
            >
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('loginForm')"
            class="login-btn block"
            :disabled="loginButtonState"
            >{{register?"注册":"登录"}}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import sha1 from 'js-sha1';
import {getSms,regUser,login} from '@/api/login';
import { reactive,ref,onMounted, computed } from '@vue/composition-api'
import {validateEmail,validatePassword,validateVCode,stripscript} from '@/utils/validate';
export default {
  name: "login",
  setup(props,{refs,root}){
    let validateUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if(!validateEmail(value)) {
        callback(new Error("用户名格式有误！"));
      } else {
        callback();
      }
    };

    let validatePass = (rule, value, callback) => {
      loginForm.pass=stripscript(value);
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if(!validatePassword(value)){
        callback(new Error("密码为6至20位数字+字母"));
      } else {
        if (loginForm.checkPass !== "") {
          refs.loginForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if(!register) {callback();}
      loginForm.checkPass=stripscript(value);
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (loginForm.checkPass !== loginForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    let validateCode=(rule,value,callback)=>{
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (!validateVCode(value)) {
        callback(new Error("验证码格式有误！"));
      } else {
        callback();
      }
      
    };

    const loginButtonState=ref(true);
    const model=ref("login");
    const codeButtonState=reactive({
      enabled:true,
      text:"获取验证码"
    });
    const timer=ref(null);

    // data数据，生命周期和自定义函数
    const menutabs=reactive([
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
    ]);

    const loginForm= reactive({
      username:"",
      pass: "",
      checkPass: "",
      validCode: "",
    });

    const rules= reactive({
      username: [{ validator: validateUserName, trigger: "blur" }],
      pass: [{ validator: validatePass, trigger: "blur" }],
      checkPass: [{ validator: validatePass2, trigger: "blur" }],
      validCode: [{ validator: validateCode, trigger: "blur" }],
    });

    const updateCodeButtonStatus=((param)=>{
      codeButtonState.enabled=param.enabled;
      codeButtonState.text=param.text;
    });

    const toggleMenutab=(tab=> {
      menutabs.forEach((item, index) => (item.selected = false));
      tab.selected = true;
      model.value=tab.type;
      resetForm("loginForm");
    });

    const btnGetSms=(()=>{
      if(!loginForm.username){
        root.$message({
          message: '邮箱为空，不能获取验证码',
          type: 'warning'
        });
        return false;
      }
      if(!validateEmail(loginForm.username)){
        root.$message({
          message: '邮箱格式有误！！',
          type: 'warning'
        });
        return false;
      }

      updateCodeButtonStatus({
        enabled:false,
        text:"发送中"
      });

      getSms({username:loginForm.username,module:model.value}).then(response=>{
        console.log(response);
        let data=response.data;
        if(data.resCode===0){
          root.$message({
            message:data.message,
            type:"success"
          });
          loginButtonState.value=false;
          countDown(60);
        }
      });
    });

    const countDown=((number)=>{
      if(timer.value){
        clearInterval(timer.value);
      }
      let time=number;
      timer.value=setInterval((number)=>{
        time--;
        if(time===0){
          clearInterval(timer.value);
          updateCodeButtonStatus({
            enabled:true,
            text:"再次获取"
          });
        }else{
          updateCodeButtonStatus({
            enabled:false,
            text:`倒计时${time}秒`
          });
        }
      },1000);
    });

    const clearCountDown=(()=>{
      if(timer.value){
        clearInterval(timer.value);
      }
      updateCodeButtonStatus({
        enabled:true,
        text:"获取验证码"
      });
    });

    const userLogin=(()=>{
      let reqData={
        username:loginForm.username,
        password:sha1(loginForm.pass),
        code:loginForm.validCode,
        module:"login"
      };
      console.log(root.$store);
      root.$store.dispatch("app/userLogin",reqData).then(response=>{
        root.$router.push({name:"Console"});
      }).catch(error=>{
        console.log(error);
      });
      // login(reqData).then(response=>{
      //   // let data=response.data;
      //   // root.$message({
      //   //   message:data.message,
      //   //   type:"success"
      //   // });
      //   root.$router.push({name:"Console"});
      // }).catch(error=>{
      //   console.log(error);
      // });
    });

    const userRegister=(()=>{
      let reqData={
        username:loginForm.username,
        password:sha1(loginForm.pass),
        code:loginForm.validCode,
        module:"register"
      };
      regUser(reqData).then(response=>{
        let data=response.data;
        root.$message({
          message:data.message,
          type:"success"
        });
        toggleMenutab(menutabs[0]);
        clearCountDown();
      }).catch(error=>{
        console.log(error);
      });
    });
    

    const submitForm=(formName=> {
      refs[formName].validate((valid) => {
        if (valid) {
          register.value?userRegister():userLogin();  
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      
    });

    const resetForm=(formName=> {
      refs[formName].resetFields();
    });

    const register=computed({get:()=>{
      var isRegister=false;
      menutabs.forEach((item,index)=>{
        if(item.selected && item.type==="register"){
          isRegister=true;
        }
      });
 
      return isRegister;
    }});
    
    // 生命周期
    onMounted(()=>{

    });

    return {
      loginButtonState,
      codeButtonState,
      menutabs,
      loginForm,
      rules,
      toggleMenutab,
      submitForm,
      btnGetSms,
      resetForm,
      register
    };

  },
  // methods: {
  //   toggleMenutab(tab) {
  //     this.menutabs.forEach((item, index) => (item.selected = false));
  //     tab.selected = true;
  //     this.resetForm("loginForm");
  //   },
  //   submitForm(formName) {
  //     this.$refs[formName].validate((valid) => {
  //       if (valid) {
  //         alert("submit!");
  //       } else {
  //         console.log("error submit!!");
  //         return false;
  //       }
  //     });
  //   },
  //   resetForm(formName) {
  //     this.$refs[formName].resetFields();
  //   },
  // },
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
