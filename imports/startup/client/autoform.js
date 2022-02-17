// https://github.com/Meteor-Community-Packages/meteor-autoform#installation
// https://github.com/Meteor-Community-Packages/meteor-autoform-themes/tree/main/plain
import 'meteor/aldeed:autoform/static';
import { AutoFormPlainTheme } from 'meteor/communitypackages:autoform-plain/static';

AutoFormPlainTheme.load();

AutoForm.setDefaultTemplate('plain');