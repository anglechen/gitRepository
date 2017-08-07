<style scoped>

.form {
    width: 100%;
}

</style>

<template>
<div>
<div >
    <hello mes-father="message from father"></hello>
    <fullTable :table-data1 = "tableDatas"  message="this is a parent props data" ></fullTable>
     <i-table :columns="columns1" :data="data1"></i-table>
</div>
<div class="form">

    <i-form ref:form-validate :model="formValidate" :rules="ruleValidate" :label-width="80" >
         
         <Row>
            <i-col span="12" >
                 <Form-item label="姓名" prop="name">
                    <i-input v-model="formValidate.name" placeholder="请输入姓名"></i-input>
                </Form-item>
            </i-col>

            <i-col span="12">
                 <Form-item label="邮箱" prop="mail">
                    <i-input v-model="formValidate.mail" placeholder="请输入邮箱"></i-input>
                </Form-item>
            </i-col>

         </Row>
       
       
        <Form-item label="城市" prop="city">
            <i-select :value.sync="formValidate.city" placeholder="请选择所在地">
                <i-option value="beijing">北京市</i-option>
                <i-option value="shanghai">上海市</i-option>
                <i-option value="shenzhen">深圳市</i-option>
            </i-select>
        </Form-item>
        <Form-item label="选择日期">
            <Row>
                <i-col span="11">
                    <Form-item prop="date">
                        <Date-picker type="date" placeholder="选择日期" v-model="formValidate.date"></Date-picker>
                    </Form-item>
                </i-col>
                <i-col span="2" style="text-align: center">-</i-col>
                <i-col span="11">
                    <Form-item prop="time">
                        <Time-picker type="time" placeholder="选择时间" v-model="formValidate.time"></Time-picker>
                    </Form-item>
                </i-col>
            </Row>
        </Form-item>
        <Form-item label="性别" prop="gender">
            <Radio-group v-model="formValidate.gender">
                <Radio label="male">男</Radio>
                <Radio label="female">女</Radio>
            </Radio-group>
        </Form-item>
        <Form-item label="爱好" prop="interest">
            <Checkbox-group v-model="formValidate.interest">
                <Checkbox label="吃饭"></Checkbox>
                <Checkbox label="睡觉"></Checkbox>
                <Checkbox label="跑步"></Checkbox>
                <Checkbox label="看电影"></Checkbox>
            </Checkbox-group>
        </Form-item>
        <Form-item label="介绍" prop="desc">
            <i-input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></i-input>
        </Form-item>
        <Form-item>
            <i-button type="primary" @click.native="handleSubmit('formValidate')">提交</i-button>
            <i-button type="ghost" @click.native="handleReset('formValidate')" style="margin-left: 8px">重置</i-button>
        </Form-item>
    </i-form>

</div>
</div>

</template>

<script>
// import axios from 'axios';
import fullTable from './fullTable.vue';
import hello from './hello.vue';
export default {
    components:{
        fullTable,hello
    },
    data() {
            return {
                tableDatas:[{
                        tableName:'测试表',
                        objectName:'测试实体' ,
                        asyncStatus:'1',
                        type:'1',
                        mainTable:'测试主表' ,
                        fKey:　'fkkey'                

                }],
                formValidate: {
                    name: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: ''
                },
                ruleValidate: {
                    name: [{
                        required: true,
                        message: '姓名不能为空',
                        trigger: 'blur'
                    }],
                    mail: [{
                        required: true,
                        message: '邮箱不能为空',
                        trigger: 'blur'
                    }, {
                        type: 'email',
                        message: '邮箱格式不正确',
                        trigger: 'blur'
                    }],
                    city: [{
                        required: true,
                        message: '请选择城市',
                        trigger: 'change'
                    }],
                    gender: [{
                        required: true,
                        message: '请选择性别',
                        trigger: 'change'
                    }],
                    interest: [{
                        required: true,
                        type: 'array',
                        min: 1,
                        message: '至少选择一个爱好',
                        trigger: 'change'
                    }, {
                        type: 'array',
                        max: 2,
                        message: '最多选择两个爱好',
                        trigger: 'change'
                    }],
                    date: [{
                        required: true,
                        type: 'date',
                        message: '请选择日期',
                        trigger: 'change'
                    }],
                    time: [{
                        required: true,
                        type: 'date',
                        message: '请选择时间',
                        trigger: 'change'
                    }],
                    desc: [{
                        required: true,
                        message: '请输入个人介绍',
                        trigger: 'blur'
                    }, {
                        type: 'string',
                        min: 20,
                        message: '介绍不能少于20字',
                        trigger: 'blur'
                    }]
                },
                columns1: [
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '年龄',
                        key: 'age'
                    },
                    {
                        title: '地址',
                        key: 'address'
                    }
                ],
                data1: [
                    {
                        name: '王小明',
                        age: 18,
                        address: '北京市朝阳区芍药居'
                    },
                    {
                        name: '张小刚',
                        age: 25,
                        address: '北京市海淀区西二旗'
                    },
                    {
                        name: '李小红',
                        age: 30,
                        address: '上海市浦东新区世纪大道'
                    },
                    {
                        name: '周小伟',
                        age: 26,
                        address: '深圳市南山区深南大道'
                    },
                    {
                        name: '王小明',
                        age: 18,
                        address: '北京市朝阳区芍药居'
                    },
                    {
                        name: '张小刚',
                        age: 25,
                        address: '北京市海淀区西二旗'
                    },
                    {
                        name: '李小红',
                        age: 30,
                        address: '上海市浦东新区世纪大道'
                    },
                    {
                        name: '周小伟',
                        age: 26,
                        address: '深圳市南山区深南大道'
                    },
                    {
                        name: '李小红',
                        age: 30,
                        address: '上海市浦东新区世纪大道'
                    },
                    {
                        name: '周小伟',
                        age: 26,
                        address: '深圳市南山区深南大道'
                    }
                ]
            }
        },
        methods: {
            handleSubmit(name) {
                    this.$Message.success('这是一条成功的提示');
                    this.axios.get("http://localhost:8080/mock/db.json").then((response) => {
				        // success
               debugger;         
				        alert(JSON.stringify(response.data, null, 4));
				      }, (error) => {
				        // error
				        console.log(error)
				      });
                },
                handleReset(name) {
                    this.$Message.warning('这是一条警告的提示');
                }
        }
}

</script>
