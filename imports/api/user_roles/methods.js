import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';

export const resetPassword = new ValidatedMethod({
  name: 'users.resetPassword',
  validate: new SimpleSchema({_id: { type: String, regEx: SimpleSchema.RegEx.Id }}).validator(),
  run(prm) {
    if (! Roles.userIsInRole(this.userId, ['admin'])) {
      // Throw errors with a specific error code
      throw new Meteor.Error('users.resetPassword', 'User does not have a role.');
    }
    if (!this.isSimulation) {
        // server only
        return Accounts.setPassword(prm._id, "heslo", {logout: true});
    }
    return;
  }
});
