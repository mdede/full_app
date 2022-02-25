import { Meteor } from 'meteor/meteor';
import helmet from "helmet";
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { linksInsert, linksUpdate, linksDelete } from '/imports/api/links/methods.js';

// Get list of all method names on Lists
const LISTS_METHODS = _.pluck([
  linksInsert,
  linksUpdate,
  linksDelete,
], 'name');

Meteor.startup(() => {
    WebApp.connectHandlers.use(
      helmet.contentSecurityPolicy({
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          connectSrc: ["*"],
          imgSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
        }
      })
    );
    // Only allow 5 list operations per connection per second
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(LISTS_METHODS, name);
        },
        // Rate limit per connection ID
        connectionId() { return true; }
        }, 5, 1000);
});

