import { Mongo } from 'meteor/mongo';

export default class DbHandler {

	insertSwimWorkout(object){

		SwimWorkout.insert( object, function(err, status){

			if(err)
				throw new Meteor.Error('Insert_Swim_Workout', err);						
		});
	}
}