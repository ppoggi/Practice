import _ from 'underscore';

import { Random } from 'meteor/random';

import DomDataExtract from '/imports/library/DomDataExtract.js'

export default class SetHandler {

	constructor(){

		this.setKeys      = ["Type", "Cycles", "Cycle Details", "Special Instructions"];
		this.setKeysCml   = ["Type", "Cycles", "CycleDetails", "SpecialInstructions"];

		this.typeKeys     = ["Warm Up", "Pre-set", "Main Set", "Focus Set", "Warm Down"];

		this.itemKeys     = ["Distance", "Reps", "Stroke", "Style", "Pace"];	

	 	this.strokeKeys   = ["Free", "IM", "Breast", "Back", "Butterfly"];

		this.styleKeys    = ["Swim", "Pull", "Kick", "Drill", "Variable"];														

		this.paceKeys     = ["Fast", "Strong", "Moderate", "Easy", "Build", "Ascend", "Descend", "Variable"];

		this.metaDistance = ["Long_Distance", "Mid_distance", "Sprint"];

		this.metaStyle    = ["Free", "IM", "Stroke"];
	}

	checkItemProperties(itemProperties){

		let error = "";

		let valid = true;

		if(isNaN(itemProperties["Distance"]))
			error += "Invalid Distance. Must be a number. ";
					
		if(isNaN(itemProperties["Reps"]))
			error += "Invalid Reps. Must be a number. ";
		
		const strokeValid = _.indexOf(this.strokeKeys, itemProperties["Stroke"]);

		const styleValid = _.indexOf(this.styleKeys, itemProperties["Style"]);

		const paceValid = _.indexOf(this.paceKeys, itemProperties["Pace"]);
		
		if(strokeValid == -1)
			error += "Invalid Stroke. ";
		
		if(styleValid == -1)
			error += "Invalid Style. ";
		
		if(paceValid == -1)
			error += "Invalid Pace. ";
		
		if(error != "")
			valid = false	

		return { valid: valid, error: error }
	};

	createCurrentItem(args, callback){
		
		const itemProperties = _.object(this.itemKeys, args);

		const check = this.checkItemProperties(itemProperties);
		
		if(!check.valid)
			if(callback){
				callback(check.error);
				return;
			}				
			else 
				return null;
		
		if(callback)
			callback(null, itemProperties);		
		else
			return itemProperties;
	};

	checkItemValues(items){
	
		let error = "";

		if(items[0] == "0" || !items[1] || items[0] == 0)
			error = "Distance"

		if(items[1] == "0" || !items[1] || items[1] == 0)
			error = "Missing Distance."
		
		return error;
	}

	checkSetData(setData){

		let error = "";

		let valid = true;

		const typeValid  = _.indexOf(this.typeKeys, setData["Type"]);
		
		if(typeValid == -1)
			error += " Invalid Type."		

		if(isNaN(setData["Cycles"]) || setData["Cycles"] == 0 || !setData["Cycles"])
			error += "Invalid Cycle. Must be a non-zero number.";


		if(error !="")
			valid = false;

		return { valid : valid, error: error};
	}

	generateSet(setDataObject, itemArray){

 		setDataObject['items']      = itemArray;

 		setDataObject['identifier'] = Random.id();

		return setDataObject;
	}

	createCurrentSetObject(setData, itemArray, callback){

		if(itemArray.length < 1)
			return callback("Must have items");

		const setDataObject = _.object(this.setKeys, setData);
				
		const setDataStatus = this.checkSetData(setDataObject);

		if(!setDataStatus.valid){
			callback(setDataStatus.error);
			return;
		}
			
		const setDataObjectCml = _.object(this.setKeysCml, setData);

		const set = this.generateSet(setDataObjectCml, itemArray);
		
		callback(null, set);
	};

	generateWorkoutObject(metaArray, sets, workoutInstructions){

		let obj = {
			Meta_tags            : metaArray,
			Sets                 : sets,
			Workout_instructions : workoutInstructions
		};

		return obj;
	}

	createWorkoutObject(metaArray, sets){

		const domDataExtract = new DomDataExtract();
		const workoutInstructions = domDataExtract.extractWorkoutInstructions();		
		
		return this.generateWorkoutObject(metaArray, sets, workoutInstructions);
	}

	verifyMetaData(metaArray){

		let error = "";
		
		if(_.intersection(metaArray, this.metaDistance).length == 0)
			error += "Distance Meta Data Required. "

		if(_.intersection(metaArray, this.metaStyle).length == 0)
			error += "Style Meta Data Required."

		if(error == "")
			return false
		
		return error;
	}
}