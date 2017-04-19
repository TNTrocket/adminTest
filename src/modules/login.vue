<template>
    <div>
        <div class="login-main">
            <div class="login-title">
                <div class="logo-con">
                    <span class="logo-img"></span>
                </div>
                <span>欢迎来到企邮数据管理平台</span>
            </div>
            <div class="login-cnt">
                <validator name="login_validator">
                    <form novalidate>
                        <div class="form-group"
                             :class="{'has-error': $login_validator.username.required && $login_validator.username.dirty}">
                            <input placeholder="账户" name="account" type="text" tabindex="1" class="form-control"
                                   v-model="username" v-validate:username="['required']">
                            <div class="control-label"
                                 v-show="$login_validator.username.required && $login_validator.username.dirty">账户不能为空
                            </div>
                        </div>
                        <div class="form-group"
                             :class="{'has-error': $login_validator.password.required && $login_validator.password.dirty}">
                            <input @keyup.enter="loginSubmit" placeholder="密码" name="password" type="password"
                                   tabindex="1" class="form-control" v-model="password"
                                   v-validate:password="['required']">
                            <div class="control-label"
                                 v-show="$login_validator.password.required && $login_validator.password.dirty">密码不能为空
                            </div>
                        </div>
                        <div class="form-group" :class="{'has-error': errorText}">
                            <button type="button" class="btn btn-primary" style="width: 100%;"
                                    :disabled="!$login_validator.valid || submitting"
                                    v-text="submitting ? '登录中...' : '登&nbsp;&nbsp;录'"
                                    @click="loginSubmit"></button>
                            <div class="control-label" style="bottom: -25px;" v-show="errorText">{{errorText}}</div>
                        </div>
                    </form>
                </validator>
            </div>
        </div>
    </div>
</template>

<script lang="babel">
    import callApi from '../services/xhr'

    export default {
        data() {
            return {
                username: '',
                password: '',
                verifyCode: '',
                errorText: null,
                submitting: false
            }
        },
        methods: {
            loginSubmit() {
                router.go('/main/index')
            }
        }
    }
</script>

<style lang="less">
    div.login-main {
        width: 400px;
        background: #fff;
        box-shadow: 0 0 5px 0 rgba(0,0,0,.1);
        font-size: 14px;
        margin: 0 auto;
        margin-top: 80px;
        border-radius: 4px;
        overflow: hidden;
    .login-title {
        margin: 0;
        padding: 30px 20px 26px;
        text-align: center;
        font-size: 18px;
    .logo-img {
        display: inline-block;
        width: 42px;
        height: 45px;
    // background: url('../../static/img/logo.png') 0 center no-repeat;
        background-size: contain;
    }
    }

    .login-cnt {
        padding: 0 25px 10px;
    }
    }

</style>