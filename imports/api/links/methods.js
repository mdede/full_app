// Methods related to links

import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import { Links } from './links.js';

export const linksSchema = new SimpleSchema({
    _id: { type: String, regEx: SimpleSchema.RegEx.Id },
    title: { type: String },
    url: { type: String },
    lastUpdatedAt: { type: Date, optional: true },
    createdAt: { type: Date, optional: true },
});

export const linksInsert = new ValidatedMethod({
  name: 'links.insert',
  validate: linksSchema.omit("_id", "lastUpdatedAt").validator({ filter: true }),
  run({ title, url }) {
    if (!this.userId) {
      // Throw errors with a specific error code
      throw new Meteor.Error('links.insert.notLoggedIn', 'Must be logged in to add links.');
    }
    return Links.insert({ url, title,
      createdAt: new Date(),
      lastUpdatedAt: new Date(),
    });
  }
});

export const linksUpdate = new ValidatedMethod({
  name: 'links.update',
  validate: linksSchema.validator({ filter: true }),
  run(doc) {
    if (!this.userId) {
      throw new Meteor.Error('links.update.notLoggedIn', 'Must be logged in to update links.');
    }
    return Links.update(doc._id, {$set: {
        url: doc.url,
        title: doc.title,
        lastUpdatedAt: new Date(),
    }});
  }
});

export const linksDelete = new ValidatedMethod({
  name: 'links.delete',
  validate: linksSchema.pick("_id").validator({ filter: true }),
  run(doc) {
    if (!this.userId) {
      throw new Meteor.Error('links.update.notLoggedIn', 'Must be logged in to delete links.');
    }
    return Links.remove(doc._id);
  }
});

