import { Session } from 'meteor/session';

import { Meteor } from 'meteor/meteor';

Template.homepage.onCreated(function(){
	
	Session.set("currentItems", []);

	Session.set("createdSets", []);

	Session.set("cycle-details", []);

	Session.set("meta-array", null);	
});