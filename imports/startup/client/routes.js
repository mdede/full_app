import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/login/login.js';
import '../../ui/pages/monitor/monitor.js';
import '../../ui/pages/not-found/not-found.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action() {
    this.render('App_body', 'App_home');
  },
});

FlowRouter.route('/mon', {
  name: 'App.mon',
  action() {
    this.render('App_body', 'Monitor');
  },
});


FlowRouter.route('/login', {
  name: 'App.login',
  action() {
    this.render('App_body', 'App_login');
  },
});


FlowRouter.route('*', {
  action() {
    this.render('App_body', 'App_notFound');
  }
});