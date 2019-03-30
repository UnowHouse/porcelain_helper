
import Home from '@/components/layout/Home'
import Index from '@/components/views/Index'

const Record = () => import('@/components/views/Record')
const Products = () => import('@/components/views/Products')
const Staffs = () => import('@/components/views/Staffs')
const Salary = () => import('@/components/views/Salary')
const Profile = () => import('@/components/views/Profile')
const E404 = () => import('@/components/pages/E404')
const Login = () => import('@/components/pages/Login')



const routes = [
    {
		path: '/',
		name: 'home',
		component: Home,
	    redirect: '/index',
	    children: [
	      {
	        path: '/index',
	        name: 'index',
	        component: Index,
	        level: 1,
	        meta: {
	          requiresAuth: true // 是否需要登录
	        }
	      },
	      {
	        path: '/record',
	        name: 'record',
	        component: Record,
	        level: 1,
	        meta: {
	          requiresAuth: true // 是否需要登录
	        }
	      },
	      {
	        path: '/products',
	        name: 'products',
	        component: Products,
	        level: 1,
	        meta: {
	          requiresAuth: true // 是否需要登录
	        }
	      },
	      {
	        path: '/staffs',
	        name: 'staffs',
	        component: Staffs,
	        level: 1,
	        meta: {
	          requiresAuth: true // 是否需要登录
	        }
	      },
	      {
	        path: '/salary',
	        name: 'salary',
	        component: Salary,
	        level: 1,
	        meta: {
	          requiresAuth: true // 是否需要登录
	        }
	      },
	      {
	        path: '/profile',
	        name: 'profile',
	        component: Profile,
	        level: 1,
	        meta: {
	          requiresAuth: true // 是否需要登录
	        }
	      },
	    ]
	},
	{
		path: '/login',
		name: 'login',
		component: Login
	},
	{
	  path: '*',
	  name: 'error404',
	  component: E404
	},
  ]

  export default routes