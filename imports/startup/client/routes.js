import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { FlowRouterTitle } from 'meteor/ostrio:flow-router-title';

const scrollToTop = () => {
  setTimeout(() => {
    if (!window.location.hash) {
      $('html, body').animate({scrollTop: 0});
    }
  }, 25);
};

FlowRouter.triggers.enter([scrollToTop]);

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/login/login.js';
import '../../ui/pages/user/user.js';
import '../../ui/pages/admin/admin.js';
import '../../ui/pages/monitor/monitor.js';
import '../../ui/pages/not-found/not-found.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  title: 'Home',
  action() {
    this.render('App_body', 'App_home');
  },
});

FlowRouter.route('/monitor', {
  name: 'App.monitor',
  title: 'Monitoring',
  action() {
    this.render('App_body', 'Monitor');
  },
});


FlowRouter.route('/login', {
  name: 'App.login',
  title: 'Login',
  action() {
    this.render('App_body', 'App_login');
  },
});

FlowRouter.route('/user', {
  name: 'App.user',
  title: 'User settings',
  action() {
    this.render('App_body', 'App_user');
  },
});

FlowRouter.route('/admin', {
  name: 'App.admin',
  title: 'Admin',
  action() {
    this.render('App_body', 'App_admin');
  },
});


FlowRouter.route('*', {
  title: "Not found...",
  action() {
    this.render('App_body', 'App_notFound');
  }
});

new FlowRouterTitle(FlowRouter);