const Cookie = require('js-cookie');
module.exports = [
  {
    key: 'dashboard',
    name: '资料设置',
    icon: 'laptop',
  },
  {
    key:'schedule',
    name:'业务管理',
    icon:'phone',
    child:[{
      key: 'myproducts',
      name: '我的产品',
      icon: 'heart-o'
    },{
      key:'myorder',
      name:'客户订单',
      icon:'shopping-cart',
    },{
      key:'consultation',
      name:'电话咨询',
      icon:'phone'
    }, {
      key:'financeList',
      name:'财务列表',
      icon:'pay-circle-o',
    },]
  },
  {
    key: 'crms',
    name: 'CRM',
    icon: 'user',
    child:[
      {
        key: 'crm',
        name: '客户管理',
        icon: 'user',
      },{
        key: 'contacts',
        name: '联系人',
        icon: 'contacts'
      },{
        key: 'collaborative',
        name: '协作律师',
        icon: 'team'
      },]
  },
  {
    key: 'ccc',
    name: '品牌宣传',
    icon: 'user',
    child:[
      {
        key: 'articles',
        name: '我的文集',
        icon: 'book'
      },
      {
        key: 'cases',
        name: '我的案例',
        icon: 'solution'
      },
      {
        key: 'activities',
        name: '我的活动',
        icon: 'appstore-o'
      },
    ]
  },
  Cookie.get('webType') == 1  ?
  {
    key: 'ddd',
    name: '组织结构',
    icon: 'contacts',
    child:[
      {
        key: 'lawyerList',
        name: '律师管理',
        icon: 'team',
        menuType:'1'
      },{
        key:'businessdomain',
        name:'业务领域',
        icon:'sync',
        menuType:'1'
      },{
        key:'anteroomManage',
        name:'会客室管理',
        icon:'solution',
        menuType:'1'
      },
    ]
  } : '',
  {
    key:'myorderdetails',
    name:'订单详情',
    icon:'edit',
    hidden:true,
  },

  // {
  //   key:'schedule',
  //   name:'日程管理',
  //   icon:'calendar'
  // },

  {
    key: 'customer',
    name: '客户详情',
    icon: 'user',
    hidden:true,
  },
  {
    key: 'contactsProfile',
    name: '联系人详情',
    icon: 'contacts',
    hidden:true,
  }, {
    key: 'collaborativeProfile',
    name: '协作律师详情',
    icon: 'team',
    hidden:true,
  },

  {
    key: 'article',
    name: '添加文章',
    icon: 'edit',
    hidden:true,
  },
  {
    key: 'case',
    name: '添加案例',
    icon: 'edit',
    hidden:true,
  },
  {
    key: 'activity',
    name: '添加活动',
    icon: 'edit',
    hidden:true,
  },

]
