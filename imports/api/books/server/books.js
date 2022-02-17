// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Books } from '../books.js';

Meteor.publish('books.all', function () {
  return Books.find({});
});
