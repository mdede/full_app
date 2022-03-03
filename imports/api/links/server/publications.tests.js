// Tests for the links publications
//
// https://guide.meteor.com/testing.html

import { assert } from 'chai';
import { Links } from '../links.js';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { createRoles, createUsers } from '../../../startup/server/users_roles.js';
import './publications.js';

createRoles();
createUsers();
const testUserID = Accounts.findUserByUsername('nu')._id;

describe('links publications', function () {
  beforeEach(function () {
    Links.remove({});
    Links.insert({
      title: 'meteor homepage',
      url: 'https://www.meteor.com',
    });
  });

  describe('links.all', function () {
    it('sends all links', function (done) {
      const collector = new PublicationCollector({ userId: testUserID });
      collector.collect('links.all', (collections) => {
        assert.equal(collections.links.length, 1);
        done();
      });
    });
  });
});
