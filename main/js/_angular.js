function formatingSchedule(schedule){

	var splitedSchedule =  schedule.split(" ");
	var time = splitedSchedule[1].split(":");
	
	if (time[0]>=7)
		time[0] = parseInt(time[0]) - 7;
	else
		time[0] = parseInt(time[0]) + 17;
	
	schedule = splitedSchedule[0]+' '+time[0]+':'+time[1]+':'+time[2];	
	return schedule;
}

function redirectToAnotherPage(page){	
  	callBackground(page);
}

function retriveSocialId(jsonData){
	var i=0;
	var res = [];
	for (var i=0;i<jsonData.length;i++){				
		res.push(jsonData[i].social_account_id);		
	}
	return res;
}

var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope._login = function (page){    	    	
    	redirectToAnotherPage(getLoginApi(page));
    	appear();
    }
});

app.controller('myMain', function($scope) {	
	$scope.schedule = '2015-09-04 08:55:18';
    $scope._publish = function (page){
    	
    	project = getProject();    	

    	project_id = project[0].project_id;
    	// project_id = '11697';

    	message = this.message;
    	schedule = this.schedule;
    	social_account_id = getSourcesProjectId(project_id);

    	schedule = formatingSchedule(schedule);    	
    	    

    	if(addSchedule(project_id,social_account_id,schedule,message) == 'Created')
    		alert('created');
    	else
    		alert('not created');
    }
});





