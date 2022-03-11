import { Links } from '/imports/api/links/links.js';
import { Meteor } from 'meteor/meteor';
import { linksSchema, linksInsert, linksUpdate, linksDelete } from '/imports/api/links/methods.js';
import './info.html';
import '../loading/loading.html';

Template.info.onCreated(function () {
//  this.getListId = () => FlowRouter.getParam('_id');
  this.autorun(() => {
//    this.subscribe('todos.inList', this.getListId());
      this.subscribe('links.all');
  });
  this.edit_id = new ReactiveVar('');
});

Template.info.helpers({
  links() {
    return Links.find({}, { sort: { lastUpdatedAt: -1 } });
  },
  isEdited(_id) {
    return _id === Template.instance().edit_id.get() ? true : false;
  },
});

Template.single_link.onCreated(function () {
    let parentView = Blaze.currentView.parentView.parentView.parentView.parentView.parentView;
    let parentInstance = parentView.templateInstance();
    this.edit_id = parentInstance.edit_id;
    this.autorun(() => {
        linksSchema.validate(Template.currentData());
    });
});

Template.single_link.helpers({
  isEdited(_id) {
    return _id === Template.instance().edit_id.get() ? true : false;
  },
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
   'click .add-link' (event, instance) {
       instance.edit_id.set('new');
   },
 });

Template.single_link.events({
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
  'click .edit-link' (event, instance) {
      instance.edit_id.set(this._id);
  },
});
