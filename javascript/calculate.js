/* 
*****************CALCULATOR in pure JS, CSS and HTML**********************
**************************************************************************
*************************Developped by Elisa Amaral***********************
**************************************************************************
***********************https://github.com/elisa-amaral********************
************************************************************************** 
*/

// HTML elements and control variable
let display = document.getElementById('display')
let sumButton = document.getElementById('sumButton')
let subtractButton = document.getElementById('subtractButton')
let multiplyButton = document.getElementById('multiplyButton')
let divideButton = document.getElementById('divideButton')
let decimalPointButton = document.getElementById('decimalPointButton')
let equalsButton = document.getElementById('equals')
let operators = document.getElementsByClassName('operator')
let mathOperation = []
let firstNumberDigitsArray = []
let secondNumberDigitsArray = []
let firstNumberDigitsString = ''
let secondNumberDigitsString = ''
let operatorCache = ''
let currentResult = null
let firstNumberIsFloat = false
let secondNumberIsFloat = false
let operatorIsSet = false
let runningChainedOperations = false
let firstNumber = 0
let secondNumber = 0
let operator = ''
let result = 0
let startedSecondNumberInput = false
let calledResultFromEqualsButton = false
let currentResultIsNegative = false
let pressedShift = false
let calledAddWithShift = false
let addedDecimalPointToFirstNumber = false
let addedDecimalPointToSecondNumber = false

// initial control states
decimalPointButton.disabled = false
equalsButton.disabled = true

function add(firstNumber, secondNumber)
{
    const sum = firstNumber + secondNumber
    return sum
}

function subtract(firstNumber, secondNumber)
{
    const difference = firstNumber - secondNumber
    return difference
}

function multiply(firstNumber, secondNumber)
{
    const product = firstNumber * secondNumber
    return product
}

function divide(firstNumber, secondNumber)
{
    const quotient = firstNumber / secondNumber
    return quotient
}

function operate(firstNumber, operator, secondNumber)
{
    let result

    if (operator === '+')
    {
        result = add(firstNumber, secondNumber)
    }
    else if (operator === '-')
    {
        result = subtract(firstNumber, secondNumber)
    }
    else if (operator === '*')
    {
        result = multiply(firstNumber, secondNumber)
    }
    else if (operator === '/')
    {
        if (secondNumber == 0)
        { 
            alert(`Hey! Look at what you just did!\n${firstNumber} ÷ 0 = ∞ => x ÷ 0 = ∞ \nSo, please try again.`)
            backspace()
            result = firstNumber
        }
        else 
        {
            result = divide(firstNumber, secondNumber)
        }
        
    }

    return result
}

function backspace()
{   
    const deletedValueIndex = display.value.length - 1
    const indexOfvalueBeforeDeleted = display.value.length - 2
    const valueBeforeDeleted = display.value[indexOfvalueBeforeDeleted]
    const deletedValue = display.value[deletedValueIndex]
    let deletedAnOperator = false

    display.value = display.value.slice(0, -1) // (start, end)
    mathOperation.pop()
    
    if ((valueBeforeDeleted === '+') || (valueBeforeDeleted === '-') 
    || (valueBeforeDeleted === '*') || (valueBeforeDeleted === '/'))
    {
        equalsButton.disabled = true
    }
    
    if ((deletedValue === '+') || (deletedValue === '-') 
        || (deletedValue === '*') || (deletedValue === '/')) 
    {
         
         deletedAnOperator = true
    }

    if (deletedAnOperator)
    {
        equalsButton.disabled = true
    }

    if (((operatorIsSet && runningChainedOperations) && deletedAnOperator)
           || !startedSecondNumberInput)
    {
        operatorIsSet = !operatorIsSet   
    }
}

function clearResult()
{
    result = 0
}

function clearDisplay()
{
    display.value = ''
}

function clearPartOfControlVariables()
{
    buttonValue = ''
    mathOperation = []
    firstNumberDigitsArray = []
    secondNumberDigitsArray = []
    firstNumberDigitsString = ''
    secondNumberDigitsString = ''
    operatorCache = ''
    currentResult = null
    firstNumberIsFloat = false
    secondNumberIsFloat = false
    operatorIsSet = false
    runningChainedOperations = false
    firstNumber  = 0
    secondNumber = 0
    operator = ''
    startedSecondNumberInput = false
    addedDecimalPointToFirstNumber = false
    addedDecimalPointToSecondNumber = false
    equalsButton.disabled = true
}

function clearAll()
{
    console.clear()
    currentResultIsNegative = false
    calledResultFromEqualsButton = false
    decimalPointButton.disabled = false
    clearPartOfControlVariables()
    clearDisplay()
    clearResult()  
}

function operatorsInputControl(operator)
{   
    if (!operatorIsSet && !display.value)
    {  
        mathOperation.push(0)
        display.value += 0
        operatorIsSet = !operatorIsSet
        mathOperation.push(operator)
        
        if (operator === '/')
        {
            display.value += '÷'
        }
        else
        {
            display.value += operator
        }
    }
    else if ((!operatorIsSet && display.value 
             || 
             (!operatorIsSet && runningChainedOperations))) 
    {   
        operatorIsSet = !operatorIsSet
        mathOperation.push(operator)

        if (operator === '/')
        {
            display.value += '÷'
        }
        else
        {
            display.value += operator
        }
    }
    else if (operatorIsSet && runningChainedOperations)
    {
        if (!startedSecondNumberInput)
        {
            mathOperation.pop()
            display.value = display.value.slice(0, -1)
            mathOperation.push(operator)
            if (operator === '/')
            {
                display.value += '÷'
            }
            else
            {
                display.value += operator
            }
        }
        else 
        {
            operatorCache = operator
            setResult(false) // setResult(calledEqualsButton = false)
        } 
    }
    else if (operatorIsSet && !runningChainedOperations)
    {
        mathOperation.pop()
        display.value = display.value.slice(0, -1)
        mathOperation.push(operator)
        if (operator === '/')
        {
            display.value += '÷'
        }
        else
        {
            display.value += operator
        }
    }
}

function digitsInputControl(buttonValue)
{
    if (!display.value)
    {   
        if (buttonValue === '.')
        {
            display.value = 0
            display.value += buttonValue
            mathOperation.push(0)
            addedDecimalPointToFirstNumber = true
        }
        else
        {   
            display.value = buttonValue
        }
    }
    else if (display.value && !operatorIsSet)
    {
        if (buttonValue === '.')
        {
            addedDecimalPointToFirstNumber = true
        }
        display.value += buttonValue
    }
    else if (display.value && operatorIsSet)
    {   
        if (buttonValue === '.')
        {
            addedDecimalPointToSecondNumber = true
        }
        
        startedSecondNumberInput = true 
        display.value += buttonValue
    }
    
    // after updating display, add buttonValue to mathOperation array
    mathOperation.push(buttonValue)
    

    // operation buttons working as equals
    if (startedSecondNumberInput)
    {
        decimalPointButton.disabled = false
        sumButton.onclick = function(){
            runningChainedOperations = true
            operatorsInputControl('+')
        };

        subtractButton.onclick = function() {
            runningChainedOperations = true
            operatorsInputControl('-')
        };

        multiplyButton.onclick = function() {
            
            runningChainedOperations = true
            operatorsInputControl('*')
        };

        divideButton.onclick = function() {
            runningChainedOperations = true
            operatorsInputControl('/')
        };
   }

    if (startedSecondNumberInput && calledResultFromEqualsButton)
    {
        calledResultFromEqualsButton = false
    }

    if (calledResultFromEqualsButton && !startedSecondNumberInput)
    {
        decimalPointButton.disabled = true
    }

    if (addedDecimalPointToFirstNumber && !startedSecondNumberInput)
    {
        decimalPointButton.disabled = true
    }

    if (addedDecimalPointToSecondNumber && startedSecondNumberInput)
    {
        decimalPointButton.disabled = true
    }

    if (startedSecondNumberInput)
    {
        equalsButton.disabled = false
        calledAddWithShift = false 
        pressedShift = false
    }
}

// keyboard calls
document.addEventListener('keydown', function(e) { // e = keypress event

    if (e.key === 'ShiftLeft' || e.key === 'ShiftRight' || e.keyCode === 16 )
    {
        pressedShift = true
    }
    
    if (e.code === 'Digit0' || e.code === 'Numpad0') 
    {
        digitsInputControl(0)
    }
    
    if (e.code === 'Digit1' || e.code === 'Numpad1')
    {   
        digitsInputControl(1)
    }
    
    if (e.code === 'Digit2' || e.code === 'Numpad2')
    {   
        digitsInputControl(2)
    }
    
    if (e.code === 'Digit3'|| e.code === 'Numpad3')
    {   
        digitsInputControl(3)
    }
    
    if (e.code === 'Digit4' || e.code === 'Numpad4')
    {   
        digitsInputControl(4)
    }
    
    if (e.code === 'Digit5')
    {   
        digitsInputControl(5)
    }
    
    if (e.code === 'Digit6' || e.code === 'Numpad6')
    {   
        digitsInputControl(6)
    }
    
    if (e.code === 'Digit7'  || e.code === 'Numpad7')
    {   
        digitsInputControl(7)
    }
    
    if (e.code == 'Digit8' && pressedShift)
    {   
        if(pressedShift)
        {
            if (!startedSecondNumberInput)
            {
                operatorsInputControl('*')
            }
            else 
            {   
                runningChainedOperations = true
                operatorCache = '*'
                setResult(false) // setResult(calledEqualsButton = false)
            }
        }
    }
    
    if ((e.code=== 'Digit8' && !pressedShift) || e.code === 'Numpad8')
    {
        digitsInputControl(8)
    }
    
    if (e.code === 'Digit9' || e.code === 'Numpad9')
    {   
        digitsInputControl(9)
    }
    
    if (pressedShift)
    {   
        if (e.keyCode == 187)
        {
            calledAddWithShift = true
            if (!startedSecondNumberInput)
            {
                operatorsInputControl('+')
            }
            else 
            {   
                runningChainedOperations = true
                operatorCache = '+'
                setResult(false) // setResult(calledEqualsButton = false)
            }
        }
    }
    
    if (e.code === 'NumpadAdd')
    {
        if (!startedSecondNumberInput)
        {
            operatorsInputControl('+')
        }
        else 
        {   
            runningChainedOperations = true
            operatorCache = '+'
            setResult(false) // setResult(calledEqualsButton = false)
        }
    }
    
    if (e.code === 'NumpadSubtract' || e.keyCode == 189)
    {
        if (!startedSecondNumberInput)
        {
            operatorsInputControl('-')
        }
        else 
        {   
            runningChainedOperations = true
            operatorCache = '-'
            setResult(false) // setResult(calledEqualsButton = false)
        }
    }
    
    if (e.code === 'NumpadMultiply')
    {
        if (!startedSecondNumberInput)
        {
            operatorsInputControl('*')
        }
        else 
        {   
            runningChainedOperations = true
            operatorCache = '*'
            setResult(false) // setResult(calledEqualsButton = false)
        }
    }
    
    if (e.code === 'NumpadDivide' || e.keyCode == 191 || e.keyCode == 193)
    {
        if (!startedSecondNumberInput)
        {
            operatorsInputControl('/')
        }
        else 
        {   
            runningChainedOperations = true
            operatorCache = '/'
            setResult(false) // setResult(calledEqualsButton = false)
        }
    }
    
    if (e.code === 'Equal' || e.code === 'Enter')
    {
        if (!calledAddWithShift && startedSecondNumberInput)
        {
            setResult(true)
        }
    }
    
    if (e.code === 'NumpadDecimal' || e.keyCode == 190)
    {
        digitsInputControl('.')
    }
    
    if (e.code === 'Delete' || e.code === 'Backspace')
    {
        backspace()
    }
    
    if (e.code === 'KeyC')
    {
        clearAll()
    }
});

function resultIsFloat(result)
{
    return Number(result) === result && result % 1 !== 0;
}

function setResult(calledEqualsButton)
{   

    if (calledEqualsButton == true)
    {
        calledResultFromEqualsButton = true
    }

    for (i = 0; i < mathOperation.length; i++)
    {   
        if (mathOperation[i] === "+" || mathOperation[i] === "-" 
        || mathOperation[i] === "*" || mathOperation[i] === "/")
        {
            
            if (currentResultIsNegative)
            {   
                mathOperation.shift()
                mathOperation[0] = parseInt(mathOperation[0])
                secondNumberDigitsArray = mathOperation.splice(i)

                const operatorIndex = mathOperation.length -1

                operator = mathOperation[operatorIndex]
                mathOperation.splice(operatorIndex, 1)
                firstNumberDigitsArray = mathOperation
            }
            else 
            {
                secondNumberDigitsArray = mathOperation.splice(i+1)

                const operatorIndex = mathOperation.length - 1

                operator = mathOperation[operatorIndex]
                mathOperation.splice(operatorIndex, 1)
                firstNumberDigitsArray = mathOperation
            }
        }
    }

    for (j = 0; j < firstNumberDigitsArray.length; j++)
    {
        firstNumberDigitsString += firstNumberDigitsArray[j]
    }

    for (k = 0; k < secondNumberDigitsArray.length; k++)
    {
        secondNumberDigitsString += secondNumberDigitsArray[k]
    }

    if (firstNumberDigitsString.includes('.'))
    {
        firstNumber = parseFloat(firstNumberDigitsString) // from string to float
        firstNumberIsFloat = true
    }
    else 
    {
        firstNumber = parseInt(firstNumberDigitsString) // from string to intenger
    }
    
    if (secondNumberDigitsString.includes('.'))
    {
        secondNumber = parseFloat(secondNumberDigitsString) // from string to float
        secondNumberIsFloat = true
    }
    else 
    {
        secondNumber = parseInt(secondNumberDigitsString) // from string to integer
    }
    
    // finalizing the convertion of firstNumber to negative  
    if (currentResultIsNegative)
    {
        firstNumber = -Math.abs(firstNumber)
    }

    result = operate(firstNumber, operator, secondNumber)

    if (firstNumberIsFloat || secondNumberIsFloat)
    {
        result = Math.round(result * 1e6 ) / 1e6; // set to 2 decimal places
    }

    if (resultIsFloat(result))
    {
        result = Math.round(result * 1e6 ) / 1e6; // set to 2 decimal places
    }
    
    if (runningChainedOperations)
    {
    
        display.value = result
        
        if (operatorCache === '/')
        {
            display.value += '÷'
        }
        else
        {
            display.value += operatorCache
        }
    }
    else 
    {
        display.value = result
    }

    currentResult = result
    
    if (currentResult === 0)
    {
        clearDisplay()
        clearResult()
        clearPartOfControlVariables()
    }
    else if (currentResult < 0)
    {
        currentResultIsNegative = true
    }

    if (calledResultFromEqualsButton)
    {
        clearPartOfControlVariables()
    }

    updateOperationPairData()
    clearResult()
}

function setResultAsFirstNumber()
{
    
    mathOperation = []
    const resultDigitsString = result.toString() 

    for (i = 0; i < resultDigitsString.length; i++)
    {
        mathOperation[i] = resultDigitsString[i]
    }
    
    for (j = 0; j < mathOperation.length; j++)
    {
        if (currentResultIsNegative)
        {
            if(mathOperation[j] != "." && j != 1)
            {
                mathOperation[j] = parseInt(mathOperation[j])
            }
        }
        else
        {
            if(mathOperation[j] != ".")
            {
                mathOperation[j] = parseInt(mathOperation[j])
            }
        }
        
    }

    if (runningChainedOperations)
    {
        mathOperation.push(operatorCache)
    }
}

function updateOperationPairData()
{
    setResultAsFirstNumber()

    firstNumberDigitsArray = []
    secondNumberDigitsArray = []
    firstNumberDigitsString = ''
    secondNumberDigitsString = ''
    operatorCache = ''
    operator = ''
    firstNumberIsFloat = false
    secondNumberIsFloat = false
    runningChainedOperations = false
    firstNumber = 0 
    secondNumber = 0
    startedSecondNumberInput = false
    addedDecimalPointToFirstNumber = false
    addedDecimalPointToSecondNumber = false
    equalsButton.disabled = true

    for (i = 0; i < 4; i++)
    {
        operators[i].disabled = false
    }
}