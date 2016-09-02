import _ from 'underscore';

export default class ServerVerification {

	constructor(){

		this.setKeysCml   = ["Type", "Cycles", "CycleDetails", "SpecialInstructions"];

		this.typeKeys     = ["Warm Up", "Pre-set", "Main Set", "Focus Set", "Warm Down"];

		this.itemKeys     = ["Distance", "Reps", "Stroke", "Style", "Pace"];	

	 	this.strokeKeys   = ["Free", "IM", "Breast", "Back", "Butterfly"];

		this.styleKeys    = ["Swim", "Pull", "Kick", "Drill", "Variable"];														

		this.paceKeys     = ["Fast", "Strong", "Moderate", "Easy", "Build", "Ascend", "Descend", "Variable"];

		this.metaDistance = ["Long_Distance", "Mid_distance", "Sprint"];

		this.metaStyle    = ["Free", "IM", "Stroke"];

		this.cycleKeys    =  ["None", "Free", "IM", "Choice", "Stroke", "Fly", "Back", "Breast", "Swim", "Pull", "Kick", "Drill"];
	}

	isNumeric(n) {
  	
  		return !isNaN(parseFloat(n)) && isFinite(n);
	}


	verifyMetaTags(metaTags){

		let error = "";

		if( metaTags != "" && _.intersection(metaTags, this.metaDistance).length == 0)
			error += "Distance Meta Tags missing. Invalid Object. "

		if(metaTags != "" && _.intersection(metaTags, this.metaStyle).length == 0)
			error += "Style Meta Tags missing. Invalid Object. "
		
		if(error == "")
			return null

		return error;
	}


	verifySets(sets){

		let error = "";

		if( !Array.isArray(sets) || sets.length < 1 ){
			error += "Invalid Sets. Invalid Object. "
			return error;
		}

		return null;
	}

	verifyWorkoutObject(workoutObject){


		let tagError = "";

		const metaTags = workoutObject.Meta_tags;

		tagError+= this.verifyMetaTags(metaTags);

		if(!tagError)
			return tagError;

		const sets = workoutObject.Sets;

		let setError = this.verifySets(sets)

		if(setError)
			return setError;
			
		return null;
	}
}
