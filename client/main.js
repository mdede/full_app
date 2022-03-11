// Client entry point, imports all client code

import '/imports/startup/client';
import '/imports/startup/both';

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

//bootstrap imports in this order
import { $ } from 'meteor/jquery';
import "@popperjs/core";
import "bootstrap/dist/js/bootstrap.bundle";
