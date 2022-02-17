import { Links } from '/imports/api/links/links.js';
import { Meteor } from 'meteor/meteor';
import { linksInsert, linksUpdate, linksDelete } from '/imports/api/links/methods.js';
import './info.html';

Template.info.onCreated(function () {
//  this.getListId = () => FlowRouter.getParam('_id');
  this.autorun(() => {
//    this.subscribe('todos.inList', this.getListId());
      this.subscribe('links.all');
  });
//  _id of edited link
  this.edit_id = new ReactiveVar('');
});

Template.info.helpers({
  links() {
    return Links.find({}, { sort: { lastUpdatedAt: -1 } });
  },
  isEdited(_id) {
    return _id === Template.instance().edit_id.get() ? true : false;
  }
});

Template.info.events({
  'submit .info-link-add' (event, instance) {
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
          instance.edit_id.set('');
      }
    });
  },
    'submit .info-link-update' (event, instance) {
      event.preventDefault();
      const target = event.target;
      linksUpdate.call({
        _id: Template.instance().edit_id.get(),
        title: target.title.value,
        url: target.url.value
      }, (err, res) => {
        if (err) {
          alert(err);
        } else {
          instance.edit_id.set('');
        }
      });
    },

    'click .remove-link' (event, instance) {
      linksDelete.call({
        _id: event.target.getAttribute('data')
      }, (err, res) => {
        if (err) {
          alert(err);
        } else {
          instance.edit_id.set('');
        }
      });

    },
  'click .edit_cancel' (event, instance) {
    event.preventDefault();
    instance.edit_id.set('');
  },
  'click .edit-link, click .add-link' (event, instance) {
    const _id = event.target.getAttribute('data');
    instance.edit_id.set(_id);
  },
});
