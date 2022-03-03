// Fill the DB with example data on startup
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

const SEED_PASSWORD = 'heslo';

Meteor.startup(() => {
    createRoles();
    createUsers();
});

export function createRoles() {
//    top level roles to be assigned to users
    Roles.createRole('normal', {unlessExists: true});
    Roles.createRole('manage', {unlessExists: true});
    Roles.createRole('admin', {unlessExists: true});

//    low level role on collections
    Roles.createRole('USERS_VIEW', {unlessExists: true});
    Roles.createRole('LINKS_EDIT', {unlessExists: true});

//mapping of the roles
    Roles.addRolesToParent('USERS_VIEW', 'admin');
    Roles.addRolesToParent('LINKS_EDIT', 'admin');
    Roles.addRolesToParent('LINKS_EDIT', 'normal');
}

export function createUsers() {
    const users = [
        {username: 'nu', name:"Normal_User",roles:['normal']},
        {username: 'mu', name:"Manage_User",roles:['manage']},
        {username: 'ad', name:"Admin_User" ,roles:['admin']}
    ];
    users.forEach(function (userData) {
      let id = Accounts.findUserByUsername(userData.username);
      if(!id) {
          id = Accounts.createUser({
            username: userData.username,
            password: SEED_PASSWORD,
            profile: { name: userData.name }
          });
      }
      Roles.addUsersToRoles(id, userData.roles);
    });
}
