// Tests for links methods
//
// https://guide.meteor.com/testing.html

import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';
import { Links } from './links.js';
import { linksInsert } from './methods.js';

if (Meteor.isServer) {
  describe('links methods', function () {
    beforeEach(function () {
      Links.remove({});
    });

    it('can not add incorrect link Title', function () {
        assert.throws(() => {
            linksInsert.call({title: 1, url: 'https://www.meteor.com'});
        }, undefined, /must be of type String/);
    });
    it('can not add incorrect link Url', function () {
        assert.throws(() => {
            linksInsert.call({title: "String OK", url: -100});
        }, undefined, /must be of type String/);
    });
    it('can add a new link', function () {
      linksInsert.call({title: 'meteor.com', url: 'https://www.meteor.com'});
      assert.equal(Links.find().count(), 1);
    });
  });
}
