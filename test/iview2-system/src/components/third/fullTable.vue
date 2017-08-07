<template>
    <div>
        <div v-show="!formStatus.status">
            <Row>   
                 <Col span="24">
                    <div style="margin-bottom: 10px;">
                      <i-button type="primary" @click.native="handleAdd('formValidate')">新增</i-button>
                      <i-button type="primary" @click.native="handleMod('formValidate')">修改</i-button>
                      <i-button type="primary" @click.native="handleDel('formValidate')">删除</i-button>
                    </div>
                </Col> 
            </Row>
             <Row>
              <Col span="24">
                <Collapse>
                <Panel name="1">
                    搜索
                    <p slot="content">
                        <i-form :label-width="80">
                        <Row>
                             <Col span="11">
                                <Form-item label="姓名" prop="name">
                                    <i-input v-vuerify="'name'" v-model="formValidate.name" ></i-input>
                                </Form-item>
                             </Col>
                             <Col span="2"></Col>
                            <Col span="11">
                                <Form-item label="邮箱" prop="name">
                                    <i-input v-model="formValidate.email" ></i-input>
                                </Form-item>
                             </Col>
                        </Row>
                        <Row style="text-align:right;">   
                            <i-button type="primary" @click.native="handleSearch()">搜索</i-button>
                            <i-button type="primary" @click.native="handleSearchReset()">重置</i-button>
                        </Row>
                         
                        </i-form>
                    </p>
                </Panel>
            </Collapse>
            </Col>
            </Row>
            <Row style= "margin-top:5px;">
                <Col span="24">
                    <Table :data="tableData1" :columns="tableColumns1" border  stripe @on-selection-change="selectChange"></Table>  
                </Col> 
            </Row>
            
            <div style="margin: 10px;overflow: hidden" >
                <div style="float: right;">
                    <Page :total="100" :current="1" @on-change="changePage"></Page>
                </div>
            </div>
        </div>
        <div v-if="formStatus.status" class="form">
            <i-form ref:form-validate :model="formValidate" :rules="ruleValidate" :label-width="80">
                <Row>
                    <Col style="display:none;"> 
                        <Form-item label="id" prop="id">
                        <i-input v-model="formValidate.id" ></i-input>
                        </Form-item>
                    </Col>
                    <Col span="12"> 
                        <Form-item label="表名" prop="tableName">

                        <i-input v-model="formValidate.tableName" placeholder="请输入表名"></i-input>
                        </Form-item>
                    </Col>
                    <Col span="12">
                        <Form-item label="实体名称" prop="objectName">
                            <i-input v-model="formValidate.objectName" placeholder="实体名称"></i-input>
                        </Form-item>  
                    </Col>
                </Row>
                <Row>
                     <Col span="12"> 
                        <Form-item label="同步状态" prop="asyncStatus">
                            <i-select　v-model="formValidate.asyncStatus"  placeholder="同步状态">
                                <i-option value=1>已同步</i-option>
                                <i-option value=0>未同步</i-option>
                            </i-select>
                        </Form-item>
                     </Col>
                      <Col span="12"> 
                        <Form-item label="类型" prop="type">
                            <i-select v-model="formValidate.type"  placeholder="类型">
                                <i-option value=1>主表</i-option>
                                <i-option value=0>子表</i-option>
                            </i-select>
                        </Form-item>
                      </Col>
                </Row>
                   <Row>
                     <Col span="12"> 
                        <Form-item label="所属主表" prop="mainTable">
                            
                            <i-input v-model="formValidate.mainTable" placeholder="所属主表"></i-input>
                        </Form-item>
                     </Col>
                      <Col span="12"> 
                        <Form-item label="所属外键" prop="fKey">
                            
                            <i-input v-model="formValidate.fKey" placeholder="所属外键"></i-input>
                        </Form-item>
                      </Col>
                </Row>
                 <Row>
                     <Col span="24"> 
                        <Form-item label="备注" prop="notes">
                            <i-input v-model="formValidate.notes" type="textarea" placeholder="备注"></i-input>
                        </Form-item>
                    </Col>
                </Row>
                
                
                

            </i-form>
             <Row style="text-align:left;margin-bottom:5px;">   
                <i-button type="primary" @click.native="handleAddRow()">添加行</i-button>
              </Row>
             <Row >
            
            <div id="childTable">
                <Table :data="addTableData1" :columns="addTableColumns1" border  stripe></Table>  
             </div>
            </Row>
            <Row style="text-align:center;margin-top:10px;">
                <!-- <Col span="24"> -->
                     <i-button type="primary" @click.native="handleSubmit('formValidate')">提交</i-button>
                    <i-button type="ghost" @click.native="handleCancle('formValidate')" style="margin-left: 8px">取消</i-button>
                    <i-button type="ghost" @click.native="handleReset('formValidate')" style="margin-left: 8px">重置</i-button>  
                <!-- </Col> -->
            </Row>
            
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import Vuerify from 'v-vuerify-next'
import Schema from 'async-validator';


const schema = new Schema({
  // name: {
  //   required: true
  // }
  // ,
  num : {
    required: true,
    message:"不能为空"
  }
  // ,
  // objectName:{required:true},
  // tableName:{required:true},
  // dataType:{required:true},
  // dataVaild:{required:true},
  // isAsync:{required:true}
});




Vue.use(Vuerify) 
    export default {
         // props:['message','tableData1'],
        data () {
            return {
                tableData1: this.mockTableData1(),
                // tableData1: this.tableDataProps,
               
                // message:"22",
                formStatus:{
                    status:false,
                    checkedDatas:[],
                    childFormDatas:[
                    {
                        num:'1',
                        isKey:'',
                        isNull:'',
                        objectName:'',
                        tableName:'',
                        dataType:'',
                        dataLength:'',
                        dataVaild:'',
                        isAsync:''
                    }
                    ]
                },
                editorDatas:this.mockTableData1(),
                formValidate: {
                    tableName: '',
                    objectName: '',
                    type: '',
                    mainTable: '',
                    asyncStatus: '',
                    fKey: '',
                    notes: '',
                    children:[]
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
                value1:1,
                vuerify: {
                    num: 'required',
                    name: 'required'
                  },
                  addTableColumns1:[
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '序号',
                        width: 70,
                        align:'center',
                        key: 'num',
                        render: (h, params) => {
                            debugger;
                            var self = this;
                            var row = params.row;
                            // var prow =  self.formStatus.childFormDatas[row._index];
                            
                            return h('Input', {
                                props:{
                                    value:row.num
                                },
                                 nativeOn:{
                                    keyup: () => {
                                        debugger;
                                    }
                                }
                                ,
                                on:{
                                     input: () => {
                                            debugger;
                                         // self.formStatus.childFormDatas[row._index].num = event.target.value;
                                         row.num = event.target.value;
                                         self.addTableData1[row._index] = row;
                                         this.validDatas({num:event.target.value},event.target);
                                    }
                                }
                            });
                        }
                    },
                    {
                        title: '是否主键',
                        key: 'isKey',
                        render: (h, params) => {
                            var self = this;
                            var row = params.row;
                            // var prow =  self.formStatus.childFormDatas[row._index];
                     
                            return h('Select',{
                                props:{
                                    value:row.isKey
                                    // ,
                                    // label:'是'
                                },

                                on:{
                                 input: () => {
                                        debugger;
                                         row.isKey = event.target.value;
                                         self.addTableData1[row._index] = row;
                                    // self.addTableData1[row._index].isKey = event.target.value;
                                     // self.formStatus.childFormDatas[row._index].isKey = event.target.value;
                                        
                                }
                            }
                            }, [
                                h('Option', {
                                    props: {
                                         value:1,
                                        label:'是'
                                        
                                    }
                                     
                                }),
                                 h('Option', {
                                    props: {
                                        value: 0,
                                        label:'否'

                                    }
                                })
                                
                            ])
                            
                        }
                        
                    },
                    {
                        title: '是否为空',
                         key: 'isNull',
                         render: (h, params) => {
                             var self = this;
                            var row = params.row;
                            // var prow =  self.formStatus.childFormDatas[row._index];
                            return h('Select',{
                                props:{
                                    value:row.isNull
                                },
                                on:{
                                 input: () => {
                                        debugger;
                                        row.isNull = event.target.value;
                                         self.addTableData1[row._index] = row;
                                    // self.addTableData1[row._index].isKey = event.target.value;
                                    // self.formStatus.childFormDatas[row._index].isNull = event.target.value;
                                        
                                }
                            }
                            }, [
                                h('Option', {
                                    props: {
                                        value: 1,
                                        label:'是'
                                    }
                                }),
                                 h('Option', {
                                    props: {
                                        value: 0,
                                         label:'是'
                                    }
                                },'否')
                            ]);
                        }

                    },
                    {
                        title: '实体名称',
                        key: 'objectName',
                        render: (h, params) => {
                            var self = this;
                            var row = params.row;
                            // var prow =  self.formStatus.childFormDatas[row._index];
                            return h('Input', {
                               props:{
                                    value:row.objectName
                                },
                                 on:{
                                     input: () => {
                                            debugger;
                                        // self.formStatus.childFormDatas[row._index].ObjectName = event.target.value;
                                        row.objectName = event.target.value;
                                         self.addTableData1[row._index] = row;
                                            
                                    }
                                }
                            });
                        }
                    },
                    {
                        title: '字段名称',
                         key: 'tableName',
                         render: (h, params) => {
                            var self = this;
                            var row = params.row;
                            // var prow =  self.formStatus.childFormDatas[row._index];
                            return h('Input', {
                                props:{
                                    value:row.tableName
                                },
                                 on:{
                                     input: () => {
                                            debugger;
                                        // self.formStatus.childFormDatas[row._index].tableName = event.target.value;
                                            row.tableName = event.target.value;
                                         self.addTableData1[row._index] = row;
                                    }
                                }
                            });
                        }
                    }
                    ,
                    {
                        title: '数据类型',
                        key: 'dataType',
                        render: (h, params) => {
                            var self = this;
                            var row = params.row;
                            // var prow =  self.formStatus.childFormDatas[row._index];
                            return h('Input', {
                                props:{
                                    value:row.dataType
                                },
                                 on:{
                                     input: () => {
                                            debugger;
                                        // self.formStatus.childFormDatas[row._index].dataType = event.target.value;
                                            row.dataType = event.target.value;
                                         self.addTableData1[row._index] = row;
                                    }
                                }
                            });
                        }
                    },
                    {
                        title: '数据长度',
                         key: 'dataLength',
                         render: (h, params) => {
                           var self = this;
                            var row = params.row;
                            // var prow =  self.formStatus.childFormDatas[row._index];
                            return h('Input', {
                                props:{
                                    value:row.dataLength
                                },
                                 on:{
                                     input: () => {
                                            debugger;
                                        // self.formStatus.childFormDatas[row._index].dataLength = event.target.value;
                                            row.dataLength = event.target.value;
                                         self.addTableData1[row._index] = row;
                                    }
                                }
                            });
                        }
                    },
                    {
                        title: '精度',
                        key: 'dataVaild',
                        render: (h, params) => {
                           var self = this;
                            var row = params.row;
                            // var prow =  self.formStatus.childFormDatas[row._index];
                            return h('Input', {
                                props:{
                                    value:row.dataVaild
                                },
                                 on:{
                                     input: () => {
                                            debugger;
                                        // self.formStatus.childFormDatas[row._index].dataVaild = event.target.value;
                                          row.dataVaild = event.target.value;
                                         self.addTableData1[row._index] = row;    
                                    }
                                }
                            });
                        }
                    },
                    {
                        title: '是否同步',
                         key: 'isAsync',
                         render: (h, params) => {
                            var self = this;
                            var row = params.row;
                            // var prow =  self.formStatus.childFormDatas[row._index];
                            return h('Select',{
                                props:{
                                    value:row.isAsync
                                },
                                on:{
                                 input: () => {
                                        debugger;
                                         row.isAsync = event.target.value;
                                         self.addTableData1[row._index] = row;    
                                    // self.addTableData1[row._index].isKey = event.target.value;
                                      // self.formStatus.childFormDatas[row._index].isAsync = event.target.value;  
                                }
                            }
                            }, [
                                h('Option', {
                                    props: {
                                        value: 1,
                                        label:'已同步'
                                    }
                                }),
                                 h('Option', {
                                    props: {
                                        value: 0,
                                        label:'未同步'
                                    }
                                })
                            ]);
                        }
                    },
                     {
                        title: '操作',
                        key: 'action',
                        width: 80,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            // this.remove(params.index);
                                            this.addTableData1.splice(params.index,1);
                                            this.formStatus.childFormDatas.splice(params.index,1);
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                addTableData1:[{
                    num:'',
                    isKey:'',
                    isNull:'',
                    objectName:'',
                    tableName:'',
                    dataType:'',
                    dataLength:'',
                    dataVaild:'',
                    isAsync:''
                }],
                tableColumns1: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '表名',

                        key: 'tableName'
                    },
                    {
                        title: '实体名',

                        key: 'objectName'
                    },
                    {
                        title: '同步状态',
                        key: 'asyncStatus',
                        render: (h, params) => {
                            var self = this;
                            const row = params.row;
                            const color = row.status === 1 ? 'green' : row.status === 0 ? 'red' : 'red';
                            const text = row.status === 1 ? '已同步' : row.status === 0 ? '未同步' : '未同步';
                            return h('Tag', {
                                props: {
                                    type: 'dot',
                                    color: color
                                }
                            }, text);
                        }
                    },
                    {
                        title: '类型',
                        key: 'type',
                        render: (h, params) => {
                            var self = this;
                            const row = params.row;
                            const text = row.type === 1 ? '主表' : row.type === 0 ? '主表' :'无';
                            return text;
                        }
                    },
                    {
                        title: '所属主表',
                        key: 'mainTable'

                    },
                    {
                        title: '所属外键',
                        key: 'fKey'
                    }

                ]
            }
        },
        methods: {
            mockTableData1 () {
                // let data = [];
                // for (let i = 0; i < 10; i++) {
                //     data.push({
                //         tableName:'测试表' + Math.floor(Math.random () * 100 + 1),
                //         objectName:'测试实体' + Math.floor(Math.random () * 100 + 1),
                //         asyncStatus:'1',
                //         type:'1',
                //         mainTable:'测试主表' +　Math.floor(Math.random () * 100 + 1),
                //         fKey:　'fkkey'+     Math.floor(Math.random () * 100 + 1)                 

                //     })
                // }
                // return data;
                 this.axios.get("http://localhost:8080/mainTable/getAll").then((response) => {
                        this.tableData1 = response.data;
                      }, (error) => {
                        // error
                        console.log(error)
                      });
                 return [];
            },
            formatDate (date) {
                const y = date.getFullYear();
                let m = date.getMonth() + 1;
                m = m < 10 ? '0' + m : m;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                return y + '-' + m + '-' + d;
            },
            changePage () {
                // 这里直接更改了模拟的数据，真实使用场景应该从服务端获取数据
                this.tableData1 = this.mockTableData1();
            },
            handleSubmit(name) {
                debugger;
                var self = this;
                this.formStatus.status = true;
                // http://localhost:8080/mainTable/add
                var qs = require('qs');
                var sdata = this.addTableData1;
                
                this.formValidate.children = sdata;
                console.log(JSON.stringify(this.formValidate));
                this.axios.defaults.headers.post['Content-Type'] = 'application/json';
                this.axios.post("http://localhost:8080/mainTable/add",this.formValidate).then((response) => {
                    debugger;
                     self.formStatus.status = false;
                     self.mockTableData1();
                });
                
            },
            handleAdd(name){
                this.handleReset(name);
                this.formStatus.status = true;
                this.addTableData1 = [{
                    num:this.addTableData1.length,
                    isKey:'',
                    isNull:'',
                    objectName:'',
                    tableName:'',
                    dataType:'',
                    dataLength:'',
                    dataVaild:'',
                    isAsync:''
                }];
                
            },
            handleMod(name) {
                debugger;
                 if(this.formStatus.checkedDatas.length != 1){
                    this.$Message.warning({
                        content:"必须且只能选择单条数据再修改！"
                        ,duration: 3
                    })
                    return;
                }
                this.formStatus.status = true;
                this.formValidate = this.formStatus.checkedDatas[0];
                
            },
            handleDel(name) {
                debugger;
                if(this.formStatus.checkedDatas.length == 0){
                    this.$Message.warning({
                        content:"未选择任何数据！"
                        ,duration: 3
                    })
                    return;
                }
                this.$Message.success({
                    content:"删除成功！"
                    ,duration: 3
                })
                
            },
            handleReset(name) {
                
                this.formValidate = {
                    name: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: ''
                };
            },
            handleCancle(name){
                this.formStatus.status = false;
                 var tdata = {
                    num:1,
                    isKey:'',
                    isNull:'',
                    objectName:'',
                    tableName:'',
                    dataType:'',
                    dataLength:'',
                    dataVaild:'',
                    isAsync:''
                };
                 debugger;
                 this.addTableData1 = [];
                 this.addTableData1.push(tdata);
            },
            handleChange(){
                debugger;
                alert(244)
            },
            selectChange(selection){
                debugger;
                this.formStatus.checkedDatas = selection;
            },
            validDatas(sdata,$target){
  
                 var result = {
                    errors:"",
                    fields:"fields"
                 };
                 schema.validate(sdata, (errors, fields) => {
                  
                  result.errors  = errors;
                  result.fields  = fields;
                                debugger;
                 var orignClass = $target.className ;
                 
                if(errors){
                    $target.className = orignClass + " table-input-errors";
                    $target.title ="不能为空";
                }else{
                    $target.className = orignClass.replace(/table-input-errors/g,"");
                    $target.title ="";
                }

                });
                 return result;
            },
            handleAddRow(){
                debugger;
                var tdata = {
                    num:this.addTableData1.length+1,
                    isKey:'',
                    isNull:'',
                    objectName:'',
                    tableName:'',
                    dataType:'',
                    dataLength:'',
                    dataVaild:'',
                    isAsync:''
                };
                 var sdata = this.addTableData1[this.addTableData1.length - 1];
                 debugger;
               
                 debugger;
                 this.addTableData1.push(tdata);
                 // this.formStatus.childFormDatas.push(tdata);
            },
            handleDelRow(){
                debugger;
                 this.addTableData1.push({
                    num:'',
                    isKey:'',
                    isNull:'',
                    objectName:'',
                    tableName:'',
                    dataType:'',
                    dataLength:'',
                    dataVaild:'',
                    isAsync:''
                });
            }

        }
    }
</script>

<style type="text/css">
    
    #childTable td .ivu-table-cell{padding:0px;}
    .table-input-errors {border:1px solid red;}
</style>






