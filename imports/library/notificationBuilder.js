export default class NotificationBuilder {


	'constructor'(){
		this.colors = { 
			red    : "danger",
			yellow : "warning",
			green  : "success"
		}
	}

	'generate'(color, message){

		const obj = {color: this.colors[color], message: message}		

		return obj;

	}
}