import App from '../App'

export default [{
  path: '/',
  component: App,
  children: [{
    path: '',
    component: r => require.ensure([], () => r(require('../pages/index')), 'index')
  },{
    path: '/game',
    component: r => require.ensure([], () => r(require('../pages/game')), 'game')
  }]
},{
  path: "*",
  redirect: "/"
}]
