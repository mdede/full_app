import { Meteor } from 'meteor/meteor';
import { ReactiveDict } from 'meteor/reactive-dict';
import './monitor.html';

var dateVar = new ReactiveDict();
var backgroundColor;

Template.Monitor.onCreated(function () {
    backgroundColor=$('body').css("background-color");
    $('body').css("background-color","black");
    $('.navbar').toggle('true');
    dateVar.setDefault({
        hh_mm: '00:00',
        ss: 00,
    });
    // update time every 1 second
    this.intervalJob = Meteor.setInterval(function () {
        const d = new Date;
        dateVar.set('hh_mm', String(d.getHours())+":"+String(d.getMinutes()).padStart(2, '0'));
        dateVar.set('ss', (1+d.getSeconds())*100/60);
    }, 1000);
});

Template.Monitor.onDestroyed(function () {
    $('body').css("background-color", backgroundColor);
    $('.navbar').toggle('true');
    Meteor.clearInterval(this.intervalJob);
    dateVar.destroy();
});

Template.Monitor.helpers({
  time() {
    return dateVar.get('hh_mm');
    },
  bar_percent() {
    return dateVar.get('ss');
  },
  triangle_position() {
    return -dateVar.get('ss')+50;
  },
  mon() {
    return {
        A: 54,
        P: 46,
        AP: (46/54*100).toFixed(1)
        }
  },
});
