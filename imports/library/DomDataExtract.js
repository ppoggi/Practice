import { Session } from 'meteor/session';

import { Meteor } from 'meteor/meteor';

import $ from 'jquery';


export default class DomDataExtract {

	constructor(){


	}

	extractItem(){

		let objectValues = [];

		let reps = Number($('#item-reps').val())
		
		if(reps == 0 )
			reps = "0";

		objectValues.push(reps);
		
		

		let distance = Number($('#item-distance').val());
		
		if(distance == 0)
			distance = "0";

		objectValues.push(distance);		

		objectValues.push($('#item-stroke').val());
		
		objectValues.push($('#item-style').val());
		
		objectValues.push($('#item-pace').val());
			
		return objectValues;
	}

	removeItemValues(){
		
		$('#item-reps').val('');
		Session.set('item-reps',null);
		
		$('#item-distance').val('');
		Session.set('item-distance',null);

		$('#item-stroke').val('');
		Session.set('item-stroke',null);
		
		$('#item-style').val('');
		Session.set('item-style',null);
		
		$('#item-pace').val('');	
		Session.set('item-style',null);

	}

	extractSetData(){

		let objectValues = [];

		objectValues.push($('#select-type').val());

		let cycles = Number($('#cycles-input').val());
		
		if(cycles == 0)
			cycles = "0";

		objectValues.push(cycles);

		objectValues.push(Session.get('cycle-details'));	

		objectValues.push($('#special-instructions').val());
		
		return objectValues;
	}

	removeSetDataValues(){

		$('#select-type').val('');
		Session.set('select-type',null);

		$('#cycles-input').val('');
		Session.set('cycles-input',null);

		Session.set('cycleString', null);
		Session.set('cycle-details', null);

		$('#special-instructions').val('');
		Session.set('special-instructions',null);
	}

	pickSetForRemoval(id){

		let sets = Session.get("createdSets");

		for(var i = 0; i < sets.length; i++){
			if(sets[i]["identifier"] == id){
				sets[i] = null;
				sets = _.compact(sets);
				Session.set("createdSets", sets);
			}
		}
	}

	extractWorkoutInstructions(){

		return workoutInstructions = $('#workout-instructions').text();
	}
}