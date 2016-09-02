import { Session } from 'meteor/session';

import { Meteor } from 'meteor/meteor';

import SetHandler          from '/imports/library/SetHandler.js';
import DomDataExtract      from '/imports/library/DomDataExtract.js';
import NotificationBuilder from '/imports/library/notificationBuilder.js';

Template.homepage.events({

	'change #select-type'(e){

		e.stopImmediatePropagation();
		Session.set("select-type", e.target.value);		
	},

	'change #cycles-input'(e){
		
		e.stopImmediatePropagation();
		Session.set("cycles-input", e.target.value);

		const cycleDetails = Session.get("cycle-details");

		if(!cycleDetails)
			Session.set("cycle-details",[]);
		

	},

	'change .cycle-details'(e){

		e.stopImmediatePropagation();
		let cycleDetails = Session.get("cycle-details");
		
		const arrId = Number(e.target.id.match(/\d/)[0]);
		
		cycleDetails[arrId -1] = e.target.value;		
		
		Session.set("cycle-details", cycleDetails);		
	},

	'keyup #item-reps'(e){

		e.stopImmediatePropagation();
		Session.set("item-reps", e.target.value);		
	},

	'keyup #item-distance'(e){

		e.stopImmediatePropagation();
		Session.set("item-distance", e.target.value);		
	},

	'change #item-stroke'(e){

		e.stopImmediatePropagation();
		Session.set("item-stroke", e.target.value);		
	},

	'change #item-style'(e){

		e.stopImmediatePropagation();
		Session.set("item-style", e.target.value);		
	},

	'change #item-pace'(e){
		e.stopImmediatePropagation();
		Session.set("item-pace", e.target.value);
	},

	'keyup #special-instructions'(e){

		e.stopImmediatePropagation();
		Session.set("special-instructions", e.target.value);		
	},

	'change #workout-pace'(e){

		e.stopImmediatePropagation();
		Session.set("workout-pace", e.target.value)		
	},

	'keyup #workout-instructions'(e){

		e.stopImmediatePropagation();
		Session.set("workout-instructions", e.target.value);		
	},

	'click #close-alert'(e){

		e.stopImmediatePropagation();
		Session.set('notification', null);
	},

	'click .remove-set-button'(e){

		e.stopImmediatePropagation();
		const id = e.target.value;
		
		const domDataExtract = new DomDataExtract();

		domDataExtract.pickSetForRemoval(id);

	},

	'click #add-item'(e){

		e.stopImmediatePropagation();
		Session.set('notification', null);
		
		const notificationBuilder = new NotificationBuilder();
		
		const domDataExtract = new DomDataExtract();

		const setHandler = new SetHandler();

		const itemValues = domDataExtract.extractItem();

		const itemValid = setHandler.checkItemValues(itemValues);

		if(itemValid != ""){
			Session.set("notification", notificationBuilder.generate("red", "Invalid Item."));
			return;
		}
			
		setHandler.createCurrentItem(itemValues, function(err, item){
			
			if(err){
				
				Session.set("notification", notificationBuilder.generate("red", err));			
				return;
			}

			domDataExtract.removeItemValues();
			let currentItems = Session.get('currentItems');
			currentItems.push(item);
			Session.set('currentItems', currentItems);
		});
	},

	'click #save-current-set'(e){

		e.stopImmediatePropagation();
		
		const notificationBuilder = new NotificationBuilder();
		const domDataExtract = new DomDataExtract();
		const setHandler = new SetHandler();

		const setData   = domDataExtract.extractSetData();		
		const itemArray = Session.get('currentItems');

		setHandler.createCurrentSetObject(setData, itemArray, function(err, set){

			if(err){
				
				Session.set("notification", notificationBuilder.generate("red",err));				
				return;
			}
			
			domDataExtract.removeSetDataValues();

			let currentSets = Session.get('createdSets');
			currentSets.push(set);
			Session.set('createdSets', currentSets);
			Session.set('currentItems', []);
		});
	},

	'change .meta-box'(e){

		e.stopImmediatePropagation();

		var metaBoxArr = [];

		var setDistanceBox = function(){

			Session.set('meta-array', metaBoxArr);			
		}

		$('.meta-box').map(function(){

			if(this.checked)
				metaBoxArr.push(this.value);
			else
				metaBoxArr.push(null);

			if(metaBoxArr.length == 6)
				setDistanceBox();
		});
	},

	'click #save-workout-btn'(e){

		e.stopImmediatePropagation();

		const notificationBuilder = new NotificationBuilder();
		const setHandler = new SetHandler();
		const sets = Session.get('createdSets');

		if(sets.length < 1)
			Session.set('notification', notificationBuilder.generate("red", "Must have sets to create a workout. "))

		const metaArray = _.compact(Session.get('meta-array'));

		const metaStatus = setHandler.verifyMetaData(metaArray);

		if(metaStatus){
			
			Session.set('notification', notificationBuilder.generate("red", metaStatus));
			return;
		}
		
		const workoutObject = setHandler.createWorkoutObject(metaArray, sets);

		Meteor.call('insertSwimWorkoutObject', workoutObject, (err, status) => {			

			if( status == "Success!"){
							
				Session.set('notification',  notificationBuilder.generate("green", status));
			}else{
				Session.set('notification',  notificationBuilder.generate("red", status));
			}
 
			window.scrollTo(0, 0);

		});
				
	}

});