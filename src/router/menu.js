const menu = [
  
  {
    path: '/index',
    name: '首页',
    icon: 'fa fa-home',
    level: 0,
    active: false,
    children: [],
  },
  {
    path: '/record',
    name: '员工的工作记录',
    icon: 'fa fa-database',
    level: 0,
    active: false,
    children: [],
    
  },
  {
    path: '/products',
    name: '货物的信息',
    icon: 'fa fa-cubes',
    level: 0,
    active: false,
    children: [],
  },
  {
    path: '/staffs',
    name: '员工的信息',
    icon: 'fa fa-users',
    level: 0,
    active: false,
    children: [],
  },
  {
    path: '/salary',
    name: '工资结算',
    icon: 'fa fa-file-text',
    level: 0,
    active: false,
    children: [],
  },
  {
    name: '帮助',
    icon: 'fa fa-calculator',
    level: 0,
    active: false,

    children: [
      {
        level: 1,
        path: '/help0',
        icon: 'fa fa-circle-o',
        children: [],
        active: false,
        name: '说明1'
      },
      {
        level: 1,
        path: '/help2',
        icon: 'fa fa-circle-o',
        children: [],
        active: false,
        name: '说明2'
      },
      {
        level: 1,
        path: '/help2',
        icon: 'fa fa-circle-o',
        children: [],
        active: false,
        name: '说明3'
      },
      {
        level: 1,
        path: '/help3',
        icon: 'fa fa-circle-o',
        children: [],
        active: false,
        name: '说明4'
      }
    ],
  }

]

export default menu
