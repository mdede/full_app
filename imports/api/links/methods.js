// Methods related to links

import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import { Links } from './links.js';

export const linksInsert = new ValidatedMethod({
  name: 'links.insert',
  validate: new SimpleSchema({
    title: { type: String },
    url: { type: String }
  }).validator(),
  run({ title, url }) {
    return Links.insert({
      url,
      title,
      createdAt: new Date(),
    });
  }
});
