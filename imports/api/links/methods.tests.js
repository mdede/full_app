// Tests for links methods
//
// https://guide.meteor.com/testing.html
import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Links } from './links.js';
import { linksInsert } from './methods.js';
import { createRoles, createUsers } from '../../startup/server/users_roles.js';

createRoles();
createUsers();
const testUserID = Accounts.findUserByUsername('nu')._id;

if (Meteor.isServer) {
  describe('links methods', function () {
    beforeEach(function () {
      Links.remove({});
    });

    it('linksInsert - not logged on, throws error', function () {
        assert.throws (() => {
            linksInsert.call({title: 'meteor.com', url: 'https://www.meteor.com'});
        }, undefined, /User does not have a role/);
    });
    it('linksInsert - logged on with userId', function () {
        assert.doesNotThrow (() => {
            linksInsert._execute({ userId: testUserID }, {title: 'meteor.com', url: 'https://www.meteor.com'});
        });
    });
    it('linksInsert - can not add incorrect link Title', function () {
        assert.throws(() => {
            linksInsert.validate({title: 1, url: 'https://www.meteor.com'});
        }, undefined, /must be of type String/);
    });
    it('linksInsert - can not add incorrect link Url', function () {
        assert.throws(() => {
            linksInsert.validate({title: "String OK", url: -100});
        }, undefined, /must be of type String/);
    });
    it('linksInsert - can add a new link', function () {
        assert.doesNotThrow (() => {
            linksInsert.validate({title: 'meteor.com', url: 'https://www.meteor.com'});
        });
    });
    it('linksInsert - accepts and filter our extra attr', function () {
        assert.throws (() => {
            linksInsert.validate({title: 'meteor.com', url: 'https://www.meteor.com', extra: 1});
        }, undefined, /is not allowed by the schema/);
    });

  });
}
