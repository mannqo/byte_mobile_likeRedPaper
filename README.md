这是一个社交分享平台的移动端项目~~
### 涉及技术点
+ 框架搭建：React+TypeScript
+ UI组件库：Ant Design Mobile
+ css样式：styled-component库
+ 路由管理：react-router-config(renderRoutes)
<!-- 后面有时间用一下react-transition-group来写路由跳转的过渡动画 -->

### 统一代码风格
1. 命名
  + 每个**组件**有一个父文件夹+子文件，文件夹命名首字母大写字母，子文件命名为index 
  + 其他文件用小驼峰命名

### 目录结构
非page的组件写在component里面，同一类组件放在同一个文件夹中
+ ├──src
+ |   ├──component
+ |   ├──page 页面
+ |   |   ├──Tabbar 
+ |   |   |   ├──HomePage 主页
+ |   |   |   ├──Message 消息页面
+ |   |   |   ├──PersonalCenter 个人主页
+ |   ├──routes存放路由
+ |   |   ├──index.tsx 如果你新增了页面，可以把在这里配置
比如说配置主页的路由，要注意，路径前缀为/tabbar/home,在子组件中进行配置，在该组件从props中取出，再用renderRoutes进行渲染；具体百度~~~

### 页面page
+ 主页 
  + 包括多个分类页面
+ 我的消息
+ 个人主页
  + 关注页面
  + 收藏页面(...可拓展)
+ 搜索页 -> 搜索到的页面
  + 包括多个分类页面
+ 文章详情

### github提交规范(忽略这个)
+ feat 新功能
+ update 更新
+ change 修改
+ fix 修补bug

### 存在问题
不会自动退出登录、删除token

