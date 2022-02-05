import { Links } from '/imports/api/links/links.js';
import { Meteor } from 'meteor/meteor';
import { linksInsert } from '/imports/api/links/methods.js';
import './info.html';

Template.info.onCreated(function () {
//  this.getListId = () => FlowRouter.getParam('_id');
  this.autorun(() => {
//    this.subscribe('todos.inList', this.getListId());
      this.subscribe('links.all');
  });
});

Template.info.helpers({
  links() {
    return Links.find({});
  },
});

Template.info.events({
  'submit .info-link-add'(event) {
    event.preventDefault();

    const target = event.target;
    const title = target.title;
    const url = target.url;

    linksInsert.call({
      title: title.value,
      url: url.value
    }, (err, res) => {
      if (err) {
        alert(err);
      } else {
        title.value='';
        url.value='';
      }
    });
  },
});
