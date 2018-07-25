const routers = [
	{
		path: '/',
		meta: {
			title: '信活'
		},
		component: (resolve) => require(['./views/index.vue'], resolve)
	},
	{
		path: '/index',
		meta: {
			title: '信活'
		},
		component: (resolve) => require(['./views/index.vue'], resolve)
	},
	{
		path: '/searchresume',
		meta: {
			title: '搜索简历'
		},
		component: (resolve) => require(['./views/searchresume/index.vue'], resolve)
	},
	{
		path: '/jobs',
		meta: {
			title: '职位列表'
		},
		component: (resolve) => require(['./views/jobs/index.vue'], resolve)
	},
	{
		path: '/addjobs',
		meta: {
			title: '新增职位'
		},
		component: (resolve) => require(['./views/jobs/addjobs.vue'], resolve)
	},
	{
		path: '/perfectinfo',
		meta: {
			title: '完善信息',
		},
		component: (resolve) => require(['./views/perfectinfo/index.vue'], resolve)
	},
];
export default routers;