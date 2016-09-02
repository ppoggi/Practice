import { Session } from 'meteor/session';

import { Meteor } from 'meteor/meteor';

Template.homepage.helpers({

	'selectType'(){

		return Session.get("select-type");
	},

	'cyclesInput'(){
		
		return Session.get("cycles-input");
	},

	'cycleDetailsPopulated'(){


		const cycleDetails = Session.get("cycle-details");

		if(!cycleDetails)
			return false;

		else if( cycleDetails.length < 1 )
			return false;

		return true;
	},	

	'cycleDetails'(){

		let cycleString = "";
		const cycleDetails = Session.get("cycle-details");

		if(!cycleDetails)
			return;

		for(var i = 0; i< cycleDetails.length; i++)
			cycleString = cycleString + " " + cycleDetails[i];

		Session.set("cycleString", cycleString);

		return cycleString;

	},

	'itemReps'(){

		return Session.get("item-reps");
	},

	'itemDistance'(){

		return Session.get("item-distance");
	},

	'itemStroke'(){

		return Session.get("item-stroke");
	},

	'itemStyle'(){

		return Session.get("item-style");
	},

	'itemPace'(){

		return Session.get("item-pace");
	},

	'specialInstructions'(){

		return Session.get("special-instructions");
	},

	'notification'(){

		return Session.get("notification");
	},

	'currentItems'(){

		return Session.get("currentItems");
	},

	'createdSets'(){

		return Session.get("createdSets");
	},
	'numberOfCycles'(){

		let cyclesLabels = [];
		const noCycles = Number(Session.get("cycles-input"));

		for(var i = 0; i< noCycles; i++){

			cyclesLabels[i] = i+1;
		}
		return cyclesLabels;
	}

});