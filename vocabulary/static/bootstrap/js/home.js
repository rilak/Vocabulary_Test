var problem ;
var answer ;
var correct_bar, wrong_bar, answer_bar;
var prob_node ;
var next_state = { change:false } ;

$(function () {
	document.body.style.setProperty("--button-green", "rgb(177,216,161)") ;
	document.body.style.setProperty("--button-red", "#eca5a5") ;

	correct_bar = $("#correct_bar") ;
	wrong_bar = $("#wrong_bar") ;
	answer_bar = $("#answer_bar") ;
	prob_node = document.querySelector("#prob") ;

	ChangeQuestion() ;
	
	$("#next").on('click', function() { Next(next_state); }) ;
	$("#show_answer").on('click', ShowAnswer) ;
}) ;

function SubmitAnswerByEnter(e) {
//	console.log(e) ;
//	console.log(e.target.childNodes[3].value) ;
	var usr_ans = e.target.childNodes[3].value ;
	SubmitAnswer(usr_ans) ;
	next_state.change = true ;
	return ;
}

function SubmitAnswer(usr_ans) {
	HideBars() ;
//	console.log(usr_ans + " vs. " + answer) ;
	if (usr_ans === answer) {
		correct_bar.show() ;
		document.querySelector("#next").style.background="var(--button-green)" ;
//		console.log("correct") ;
	}
	else {
		wrong_bar.show() ;
		document.querySelector("#next").style.background="var(--button-red)" ;
//		console.log("wrong") ;
	}
}

function Next(state) {
	if (state.change) {
		ChangeQuestion() ;
	}
	else {
		SubmitAnswer(document.querySelector("#input_answer").value) ;
	}
	state.change = !state.change ;
}

function ShowAnswer() {
	HideBars() ;
	document.querySelector("#answer_bar").childNodes[2].textContent = "The answer is " + answer ;
	answer_bar.show() ;
}

function HideBars() {
	$("#correct_bar").hide();
	$("#wrong_bar").hide();
	$("#answer_bar").hide();
}

function ChangeQuestion() {
// init status
	HideBars() ;
	document.querySelector("#next").style.background="" ;
	document.querySelector("#input_answer").value = "" ;
	$("#input_answer").focus();

// fetch to get new problem and answer
	var new_request = new Request('new/', {
		method: "get"
	})
	fetch(new_request).then(function(res) {
//		console.log(res) ;
		if (res.ok) {
			res.json().then(function(data) {
				problem = data.prob ;
				answer = data.ans ;
//				console.log(problem) ;
//				console.log(answer) ;
				prob.innerHTML = problem ;
			}) ;
		}
		else {
			console.log("Response error when changing question.")
		}
	}).catch(function(err) {
		alert("Error!") ;
	})
	return ;
}