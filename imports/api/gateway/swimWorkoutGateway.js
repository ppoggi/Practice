import '/imports/library/serverVerification.js';

import { Meteor } from 'meteor/meteor';

import NotificationBuilder from '/imports/library/notificationBuilder.js';
import ServerVerification  from '/imports/library/serverVerification.js';
import DbHandler           from '/imports/library/DbHandler.js';


Meteor.methods({

	'insertSwimWorkoutObject'(obj){

		const notificationBuilder = new NotificationBuilder();

		if(!Meteor.user){
			 return "You must be logged in."
		}
	
		const serverVerification = new ServerVerification();

		const error = serverVerification.verifyWorkoutObject(obj);

		if(error)
			return error;


		obj.owner = Meteor.user()._id;

		const dbHandler = new DbHandler();

		dbHandler.insertSwimWorkout(obj);

		return "Success!";
	}
});