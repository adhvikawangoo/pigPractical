let pInput = document.querySelector("#principle");
let rInput = document.querySelector("#rate");
let tInput = document.querySelector("#time");
let nInput = document.querySelector("#nValue");


let output1 = document.querySelector("#output1");

pInput.addEventListener("input", calculateInterest, false);
rInput.addEventListener("input", calculateInterest, false);
tInput.addEventListener("input", calculateInterest, false);
nInput.addEventListener("input", calculateInterest, false);


function calculateInterest()
{
	p = Number(pInput.value);
	r = Number(rInput.value);
	t = Number(tInput.value);
	n = Number(nInput.value);

	if(p >= 0 && t >= 0 && n>= 0)
	{
		let interest = p*Math.pow(((1 + r/n)), n*t);
		output1.value = interest.toFixed(3);
	}
	else
	{
		output1.value = "Input Invalid";
	}
}

calculateInterest();