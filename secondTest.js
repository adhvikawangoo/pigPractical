function reverseArray(arr)
{
	let result = [];
	for(let i = arr.length - 1; i >= 0; i--)
	{
		result[arr.length - 1 - i] = arr[i];
	}
	return result;
}

function alternateString(str1, str2)
{
	let result = ""
	for(let i = 0; i < str1.length || i < str2.length; i++)
	{
		if(i < str1.length)
		{
			result += str1.charAt(i);
		}
		if(i < str2.length)
		{
			result += str2.charAt(i);
		}
	}
	return result;
}

function hasGood(phrase)
{
	if(phrase.length >= 4)
	{
		if(phrase.substring(0, 4) == "good")
		{
			return true;
		}
	}
	if(phrase.length >= 5)
	{
		if(phrase.substring(1, 5) == "good")
		{
			return true;
		}
	}
	return false;
}

function withoutJ(phrase)
{
	let result = "";
	if(phrase.substring(0,1) == "j")
	{
		result = phrase.substring(1);
	}
	else
	{
		result = phrase;
	}
	if(result.substring(result.length - 1) == "j")
	{
		result = result.substring(0, result.length - 1)
	}
	return result;
}

function shareDigit(a, b)
{
	if(Math.floor(a / 10) == Math.floor(b / 10) ||
			Math.floor(a / 10) == b % 10)
	{
		return true;
	}
	if(a % 10 == Math.floor(b / 10) || a % 10 == b % 10)
	{
		return true;
	}
	return false;
}

function maxOrMod(a, b)
{
	if(a == b)
	{
		return 0;
	}
	if(a % 5 == b % 5)
	{
		if(a < b)
		{
			return a;
		}
		return b;
	}
	if(a < b)
	{
		return b;
	}
	return a;
}