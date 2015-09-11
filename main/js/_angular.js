function isKabisat(year){

    if (year%400 == 0)
        return true;
    else if (year%400 != 0 && year%100 == 0)
        return false;                       
    else if (year%400 != 0 && year%100 != 0 && year%4 == 0)
        return true;
    else
        return false;
}


function getMonths(year){
    var month = [31,31,30,31,30,31,30,31,31,30,31,30,31];       
    if (isKabisat(year))
        month[2] = 29;
    else
        month[2] = 29;
    return month;
}

function formatingSchedule(schedule){

    
	var splitedSchedule =  schedule.split(" ");
	var time = splitedSchedule[1].split(":");
	var date = splitedSchedule[0].split("-");
    var months = getMonths(date[0]);

    var isDay = false;
    var isMonth = false;
    var isYear = false;

	if (time[0]>=7)
		time[0] = parseInt(time[0]) - 7;
	else{
		time[0] = parseInt(time[0]) + 17;        
        isDay = true;
    }
	if (isDay){        
        date[2] = date[2]- 1;
        if (date[2] == 0){
            date[2] = months[date[1]-1];
            isMonth = true;            
        }        
    }
    if (isMonth){
        date[1] = date[1]-1;
        if (date[1] == 0){
            date[1] = 12;
            isYear = true;
        }
    }
    if (isYear)
        date[0] = date[0] - 1;

	schedule = date[0]+'-'+date[1]+'-'+date[2]+' '+time[0]+':'+time[1]+':'+'00';	
	return schedule;
}

function redirectToAnotherPage(page){	
  	callBackground(page);
}

function retriveSocialId(jsonData){
    
	var i=0;
	var res = [];
	for (var i=0;i<jsonData.length;i++){				
		res.push({'id' : {'user_id' : jsonData[i].user_id, 'source' : jsonData[i].source, 'social_account_id' : jsonData[i].social_account_id},'name':jsonData[i].screen_name});
	}
	return res;
}

function retriveProject(jsonData){

    var i=0;
    var res = [];
    for (var i=0;i<jsonData.length;i++){                
        res.push({'value' : jsonData[i].project_id,'name':jsonData[i].project_name});
    }    
    return res;
}

var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) { 
    $scope.variabel = 1;   
    $scope._login = function (page){        
    	redirectToAnotherPage(getLoginApi(page));    	
    }
});

app.controller('myMain', function($scope) {

    $scope.projects = retriveProject(getProject());
    $scope.selectedOption = $scope.projects[0].value;
    $scope.curentProject = $scope.projects[0].name;
	$scope.schedule = '';
    //$scope.message = document.referrer;    
    $scope.social_accounts = retriveSocialId(getSourcesProjectId($scope.projects[0].value));
    project_id = $scope.projects[0].value;
    $scope.selection=[];
    $scope.toggleSelection = function toggleSelection(id) {
     var idx = $scope.selection.indexOf(id);

     if (idx > -1) {
       $scope.selection.splice(idx, 1);
     }
     
     else {
       $scope.selection.push(id);
     }
    };

    $scope.addProject = function addProject(){
        addProjects($scope.projectName,$scope.projectDescription) ;        
        $scope.projects = retriveProject(getProject());
    }    
    $scope.updateProject = function updateProject(){     
        project_id = $scope.selectedOption;
        //$scope.message = document.referrer;
        $scope.social_accounts = retriveSocialId(getSourcesProjectId($scope.selectedOption));
        list_proj = retriveProject(getProject());
        for (var i = 0; i < list_proj.length; i++) {
            if (list_proj[i].value == project_id)
            $scope.curentProject = list_proj[i].name;
        };
    }

    $scope.delAcc = function delAcc(acc){
        deleteAccount(project_id, acc.social_account_id);
        $scope.social_accounts = retriveSocialId(getSourcesProjectId($scope.selectedOption));
    }

    $scope._publish = function (page){
    	
    	project = getProject();    	

    	message = getInputMessage();
    	schedule = getInputDate();        
    	
        social_account_id = $scope.selection;        
    	schedule = formatingSchedule(schedule);        

    	if(addSchedule(project_id,social_account_id,schedule,message) == 'Created'){        
    		swal("Created!", "", "success");
        }
    	else{
    		swal("Not Created!", "", "error");
        }
    }
});


function getInputDate(){
    return $('#inpDate').val();
}


function getInputMessage(){
    return $('#message').val();
}