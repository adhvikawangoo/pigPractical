function createArray ( )
{
	let array = [];
	array[0] = "THREE";
	array[1] = "DAY";
	array[2] = "WEEKEND";
	return array;
}

function nextTo100(array)
{
	for(let i = 0; i < array.length - 1; i++)
	{
		if(array[i] == 100 && array[i+1] == 100)
		{
			return true;
		}
	}
	return false;
}

function increasingScores(array)
{
	for(let i = 0; i < array.length - 1; i++)
	{
		if(array[i] > array[i+1])
		{
			return false;
		}
	}
	return true;
}

function averageArray(array)
{
	let average1 = 0;
	let total = 0;
	let average2 = 0;
	let count = 0;
	for(let i = 0; i < array.length / 2; i++)
	{
		total += array[i];
		count++;
	}
	average1 = total / count;
	total = count = 0;
	for(let i = array.length / 2; i < array.length; i++)
	{
		total += array[i];
		count++;
	}
	average2 = total / count;
	return Math.max(average1, average2);
}

function countWords(array, size)
{
	let count = 0;
	for(let i = 0; i < array.length; i++)
	{
		if(array[i].length == size)
		{
			count++;
		}
	}
	return count;
}

function doesHaveOne(n)
{
	let copy = n;
	while(copy > 0)
	{
		if(copy % 10 == 1)
		{
			return true;
		}
		copy = Math.floor(copy / 10);
	}
	return false;
}

function repeatEnd(phrase, num)
{
	let result = "";
	for(let i = 0; i < num; i++)
	{
		result = result + phrase.substring(phrase.length - num);
	}
	return result;
}

function foundAgain(str, num)
{
	let checkString = str.substring(0,num);
	for(let i = num; i < str.length - num + 1; i++)
	{
		if(str.substring(i, i + num) == checkString)
		{
			return true;
		}
	}
	return false;
}

function starMatch(phrase)
{
	if(phrase.length < 1 || phrase.charAt(0) == '*' || phrase.charAt(phrase.length - 1) == '*')
	{
		return false;
	}
	for(let i = 1; i < phrase.length - 1; i++)
	{
		if(phrase.charAt(i) == '*')
		{
			if(phrase.charAt(i-1) != phrase.charAt(i+1))
			{
				return false;
			}
		}
	}
	return true;
}

function shuffle(phrase)
{
	let result = "";
	for(let i = 0; i < phrase.length; i += 3)
	{
		if(i+3 <= phrase.length)
		{
			result += phrase.substring(i+1,i+3) + phrase.substring(i,i+1);
		}
		else
		{
			result += phrase.substring(i);
		}
	}
	return result;
}