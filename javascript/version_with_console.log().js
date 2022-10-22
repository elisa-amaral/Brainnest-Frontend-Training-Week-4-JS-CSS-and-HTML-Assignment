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

console.log(`INITIAL VALUES OF CONTROL VARIABLES`)
console.log(`display.value: ${display.value}`)
console.log(`mathOperation: ${mathOperation}`)
console.log(`firstNumberDigitsArray: ${firstNumberDigitsArray}`)
console.log(`secondNumberDigitsArray: ${secondNumberDigitsArray}`)
console.log(`firstNumberDigitsString: ${firstNumberDigitsString}`)
console.log(`secondNumberDigitsString: ${secondNumberDigitsString}`)
console.log(`operatorCache: ${operatorCache}`)
console.log(`currentResult: ${currentResult}`)
console.log(`firstNumberIsFloat: ${firstNumberIsFloat}`)
console.log(`secondNumberIsFloat: ${secondNumberIsFloat}`)
console.log(`operatorIsSet: ${operatorIsSet}`)
console.log(`runningChainedOperations: ${runningChainedOperations}`)
console.log(`firstNumber: ${firstNumber}`)
console.log(`secondNumber: ${secondNumber}`)
console.log(`operator: ${operator}`)
console.log(`result: ${result}`)
console.log(`tyepof(result): ${typeof(result)}`)
console.log(`startedSecondNumberInput: ${startedSecondNumberInput}`)
console.log(`pressedShift: ${pressedShift}`)
console.log(`calledAddWithShift: ${calledAddWithShift}`)
console.log(`decimalPointButton.disabled: ${decimalPointButton.disabled}`)
console.log(`equalsButton.disabled: ${equalsButton.disabled}`)

function backspace()
{   
    console.log(`====== backspace() ======`)
    
    const deletedValueIndex = display.value.length - 1
    const indexOfvalueBeforeDeleted = display.value.length - 2
    const valueBeforeDeleted = display.value[indexOfvalueBeforeDeleted]
    const deletedValue = display.value[deletedValueIndex]
    let deletedAnOperator = false

    console.log(`Deleted one value: ${display.value[deletedValueIndex]}`)
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

    console.log(`======\n clearPartOfControlVariables() ==================`)
    console.log(`NEW VALUES OF CONTROL VARIABLES`)
    console.log(`buttonValue: ${buttonValue}`)
    console.log(`mathOperation: ${mathOperation}`)
    console.log(`firstNumberDigitsArray: ${firstNumberDigitsArray}`)
    console.log(`secondNumberDigitsArray: ${secondNumberDigitsArray}`)
    console.log(`firstNumberDigitsString: ${firstNumberDigitsString}`)
    console.log(`secondNumberDigitsString: ${secondNumberDigitsString}`)
    console.log(`operatorCache: ${operatorCache}`)
    console.log(`currentResult: ${currentResult}`)
    console.log(`firstNumberIsFloat: ${firstNumberIsFloat}`)
    console.log(`secondNumberIsFloat: ${secondNumberIsFloat}`)
    console.log(`operatorIsSet: ${operatorIsSet}`)
    console.log(`runningChainedOperations: ${runningChainedOperations}`)
    console.log(`firstNumber: ${firstNumber}`)
    console.log(`secondNumber: ${secondNumber}`)
    console.log(`operator: ${operator}`)
    console.log(`tyepof(result): ${typeof(result)}`)
    console.log(`startedSecondNumberInput: ${startedSecondNumberInput}`)
    console.log(`addedDecimalPointToFirstNumber: ${addedDecimalPointToFirstNumber}`)
    console.log(`addedDecimalPointToSecondNumber: ${addedDecimalPointToSecondNumber}`)
    console.log(` equalsButton.disabled: ${ equalsButton.disabled}`)
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
    console.log(`====== Cleared All. Starting fresh. ======`)      
}

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

function operatorsInputControl(operator)
{   
    console.log(`\n====== operatorsInputControl(operator) ======`)
    console.log(`operator: ${operator}`)
    console.log(`typeof(operator): ${typeof(operator)}`)
    console.log(`operatorIsSet at function start: ${operatorIsSet}`)
    if (!operatorIsSet && !display.value)
    {  
        console.log(`!operatorIsSet && !display.value`)
        mathOperation.push(0)
        display.value += 0
        console.log(`mathOperation.push(0)`)
        console.log(`mathOperation.push(operator)`)

        operatorIsSet = !operatorIsSet
        console.log(`operatorIsSet = !operatorIsSet`)
        console.log(`operatorIsSet: ${operatorIsSet}`)

        mathOperation.push(operator)
        console.log(`mathOperation.push(operator)`)
        console.log(`mathOperation: ${mathOperation}`)
        
        if (operator === '/')
        {
            display.value += '÷'
        }
        else
        {
            display.value += operator
        }
        console.log(`typeof(operator): ${typeof(operator)}`)
        console.log(`display.value += operator`)
        console.log(`display.value: ${display.value}`)
    }
    else if ((!operatorIsSet && display.value 
             || 
             (!operatorIsSet && runningChainedOperations))) 
    {   

        console.log(`!operatorIsSet && display.value`)

        operatorIsSet = !operatorIsSet
        console.log(`operatorIsSet = !operatorIsSet`)
        console.log(`operatorIsSet: ${operatorIsSet}`)

        mathOperation.push(operator)
        console.log(`mathOperation.push(operator)`)
        console.log(`mathOperation: ${mathOperation}`)

        if (operator === '/')
        {
            display.value += '÷'
        }
        else
        {
            display.value += operator
        }
        console.log(`typeof(operator): ${typeof(operator)}`)
        console.log(`display.value += operator`)
        console.log(`display.value: ${display.value}`)
    }
    else if (operatorIsSet && runningChainedOperations)
    {
        console.log(`operatorIsSet && runningChainedOperations`)
        console.log(`operatorIsSet: ${operatorIsSet}`)
        console.log(`runningChainedOperations: ${runningChainedOperations}`)
        console.log(`mathOperation:`)
        console.log(mathOperation)

        if (!startedSecondNumberInput)
        {
            console.log(`startedSecondNumberInput: ${startedSecondNumberInput}`)
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
            console.log(`mathOperation.pop()
            display.value = display.value.slice(0, -1)
            mathOperation.push(operator)
            display.value += operator`)
            console.log(`mathOperation:`)
            console.log(mathOperation)
        }
        else 
        {
            console.log(`startedSecondNumberInput: ${startedSecondNumberInput}`)
            console.log(`operatorCache = operator`)
            console.log('\noperatorsInputControl() called setResult()')

            operatorCache = operator
            setResult(false) // setResult(calledEqualsButton = false)
        }
        
    }
    else if (operatorIsSet && !runningChainedOperations)
    {
        console.log(`operatorIsSet && !runningChainedOperations`)
        console.log(`operatorIsSet: ${operatorIsSet}`)
        console.log(`runningChainedOperations: ${runningChainedOperations}`)
        console.log(`mathOperation:`)
        console.log(mathOperation)
        console.log(`display.value = display.value.slice(0, -1)`)
        console.log(`display.value: ${display.value}`)
        console.log(`mathOperation.push(operator)`)
        console.log(`mathOperation: ${mathOperation}`)
        console.log(`typeof(operator): ${typeof(operator)}`)
        console.log(`\ndisplay.value += operator`)
        console.log(`display.value: ${display.value}`)

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
        console.log(`mathOperation.pop()`)
        console.log(`mathOperation:`)
        console.log(mathOperation)
    }

    console.log(`operatorIsSet at function end: ${operatorIsSet}`)
}

function digitsInputControl(buttonValue)
{
    console.log(`\n====== digitsInputControl(buttonValue) ======`)
    console.log(`buttonValue: ${buttonValue}`)
    console.log(`typeof(buttonValue): ${typeof(buttonValue)}`)
    
    if (!display.value)
    {   
        console.log(`!display.value`)
        if (buttonValue === '.')
        {
            console.log(`buttonValue === '.'`)
            display.value = 0
            display.value += buttonValue
            mathOperation.push(0)
            addedDecimalPointToFirstNumber = true
        }
        else
        {   
            console.log(`display.value = buttonValue`)
            display.value = buttonValue
        }

        console.log(`typeof(buttonValue): ${typeof(buttonValue)}`)
        console.log(`display.value: ${display.value}`)
    }
    else if (display.value && !operatorIsSet)
    {
        console.log(`display.value && !operatorIsSet`)
        console.log(`operatorIsSet: ${operatorIsSet}`)
        
        if (buttonValue === '.')
        {
            console.log(`buttonValue === '.'`)
            addedDecimalPointToFirstNumber = true
        }
        display.value += buttonValue
        console.log(`display.value += buttonValue`)
        console.log(`typeof(buttonValue): ${typeof(buttonValue)}`)
        console.log(`display.value: = ${display.value}`)
    }
    else if (display.value && operatorIsSet)
    {   
        console.log(`display.value && operatorIsSet`)
        console.log(`operatorIsSet: ${operatorIsSet}`)

        if (buttonValue === '.')
        {
            addedDecimalPointToSecondNumber = true
        }
        
        startedSecondNumberInput = true 
        console.log(`startedSecondNumberInput: ${startedSecondNumberInput}`)
        
        display.value += buttonValue
        console.log(`display.value = buttonValue`)
        console.log(`typeof(buttonValue): ${typeof(buttonValue)}`)
        console.log(`display.value: = ${display.value}`)
    }
    
    // after updating display, add buttonValue to mathOperation array
    mathOperation.push(buttonValue)
    console.log(`mathOperation.push(buttonValue)`)
    console.log(`mathOperation: ${mathOperation}`)
    
    // operation buttons working as equals
    if (startedSecondNumberInput)
    {
        console.log(`\nstartedSecondNumberInput (digitsInputControl(buttonValue))`)
        console.log(`startedSecondNumberInput: ${startedSecondNumberInput}`)

        decimalPointButton.disabled = false

        sumButton.onclick = function(){
            console.log(`sumButton.onclick`)

            runningChainedOperations = true
            console.log(`runningChainedOperations: ${runningChainedOperations}`)

            console.log(`operatorsInputControl('+')`)
            operatorsInputControl('+')
        };

        subtractButton.onclick = function() {
            console.log(`subtractButton.onclick`)

            runningChainedOperations = true
            console.log(`runningChainedOperations: ${runningChainedOperations}`)

            console.log(`operatorsInputControl('-')`)
            operatorsInputControl('-')
        };

        multiplyButton.onclick = function() {
            console.log(`multiplyButton.onclick`)

            runningChainedOperations = true
            console.log(`runningChainedOperations: ${runningChainedOperations}`)

            console.log(`operatorsInputControl('*')`)
            operatorsInputControl('*')
        };

        divideButton.onclick = function() {
            console.log(`divideButton.onclick`)

            runningChainedOperations = true
            console.log(`runningChainedOperations: ${runningChainedOperations}`)

            console.log(`operatorsInputControl('/')`)
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
        console.log(`pressedShift: ${pressedShift}`)
    }
    
    if (e.code === 'Digit0' || e.code === 'Numpad0') 
    {
        // input number 0 
        console.log(`buttonValue: 0`)
        digitsInputControl(0)
    }
    
    if (e.code === 'Digit1' || e.code === 'Numpad1')
    {   
        // input number 1
        console.log(`buttonValue: 1`)
        digitsInputControl(1)
    }
    
    if (e.code === 'Digit2' || e.code === 'Numpad2')
    {   
        // input number 2
        console.log(`buttonValue: 2`)
        digitsInputControl(2)
    }
    
    if (e.code === 'Digit3'|| e.code === 'Numpad3')
    {   
        // input number 3
        console.log(`buttonValue: 3`)
        digitsInputControl(3)
    }
    
    if (e.code === 'Digit4' || e.code === 'Numpad4')
    {   
        // input number 4
        console.log(`buttonValue: 4`)
        digitsInputControl(4)
    }
    
    if (e.code === 'Digit5')
    {   
        // input number 5
        console.log(`buttonValue: 5` || e.code === 'Numpad5')
        digitsInputControl(5)
    }
    
    if (e.code === 'Digit6' || e.code === 'Numpad6')
    {   
        // input number 6
        console.log(`buttonValue: 6`)
        digitsInputControl(6)
    }
    
    if (e.code === 'Digit7'  || e.code === 'Numpad7')
    {   
        // input number 7
        console.log(`buttonValue: 7`)
        digitsInputControl(7)
    }
    
    if (e.code == 'Digit8' && pressedShift)
    {   
        if(pressedShift)
        {
            console.log(`called MULTIPLY with shift`)
            console.log(`startedSecondNumberInput: ${startedSecondNumberInput}`)
            if (!startedSecondNumberInput)
            {
                console.log(`======sent keypressed operator to operatorFunction====`)
                operatorsInputControl('*')
            }
            else 
            {   
                console.log(`======keypressed operator called setResult()====`)
                runningChainedOperations = true
                console.log(`runningChainedOperations: ${runningChainedOperations}`)
                operatorCache = '*'
                console.log(`operatorCache = '*'`)
                setResult(false) // setResult(calledEqualsButton = false)
            }
        }
    }
    
    if ((e.code=== 'Digit8' && !pressedShift) || e.code === 'Numpad8')
    {
        console.log(`buttonValue: 8`)
        digitsInputControl(8)
    }
    
    if (e.code === 'Digit9' || e.code === 'Numpad9')
    {   
        // input number 9
        console.log(`buttonValue: 9`)
        digitsInputControl(9)
    }
    
    if (pressedShift)
    {   
        if (e.keyCode == 187)
        {
            console.log('called ADD with shift')
            calledAddWithShift = true
            console.log(`======startedSecondNumberInput======:${startedSecondNumberInput}`)
            if (!startedSecondNumberInput)
            {
                console.log(`======sent keypressed operator to operatorFunction====`)
                operatorsInputControl('+')
            }
            else 
            {   
                console.log(`======\nkeypressed operator called setResult()====`)
                runningChainedOperations = true
                console.log(`runningChainedOperations: ${runningChainedOperations}`)
                operatorCache = '+'
                console.log(`operatorCache = '+'`)
                setResult(false) // setResult(calledEqualsButton = false)
            }
        }
    }
    
    if (e.code === 'NumpadAdd')
    {
        console.log(`pressed ADD from numpad`)
        console.log(`======startedSecondNumberInput======:${startedSecondNumberInput}`)
        if (!startedSecondNumberInput)
        {
            console.log(`======sent keypressed operator to operatorFunction====`)
            operatorsInputControl('+')
        }
        else 
        {   
            console.log(`======keypressed operator called setResult()====`)
            runningChainedOperations = true
            console.log(`runningChainedOperations: ${runningChainedOperations}`)
            console.log(`runningChainedOperations: ${runningChainedOperations}`)
            operatorCache = '+'
            console.log(`operatorCache = '+'`)
            setResult(false) // setResult(calledEqualsButton = false)
        }
    }
    
    if (e.code === 'NumpadSubtract' || e.keyCode == 189)
    {
        console.log(`called SUBTRACT`)
        console.log(`======startedSecondNumberInput======:${startedSecondNumberInput}`)
        if (!startedSecondNumberInput)
        {
            console.log(`======sent keypressed operator to operatorFunction====`)
            operatorsInputControl('-')
        }
        else 
        {   
            console.log(`======keypressed operator called setResult()====`)
            runningChainedOperations = true
            console.log(`runningChainedOperations: ${runningChainedOperations}`)
            console.log(`runningChainedOperations: ${runningChainedOperations}`)
            operatorCache = '-'
            console.log(`operatorCache = '-'`)
            setResult(false) // setResult(calledEqualsButton = false)
        }
    }
    
    if (e.code === 'NumpadMultiply')
    {
        console.log(`pressed MULTIPLY from numpad`)
        console.log(`======startedSecondNumberInput======:${startedSecondNumberInput}`)
        if (!startedSecondNumberInput)
        {
            console.log(`======sent keypressed operator to operatorFunction====`)
            operatorsInputControl('*')
        }
        else 
        {   
            console.log(`======keypressed operator called setResult()====`)
            runningChainedOperations = true
            console.log(`runningChainedOperations: ${runningChainedOperations}`)
            operatorCache = '*'
            console.log(`operatorCache = '*'`)
            setResult(false) // setResult(calledEqualsButton = false)
        }
    }
    
    if (e.code === 'NumpadDivide' || e.keyCode == 191 || e.keyCode == 193)
    {
        console.log(`called DIVIDE`)
        console.log(`======startedSecondNumberInput======:${startedSecondNumberInput}`)
        if (!startedSecondNumberInput)
        {
            console.log(`======sent keypressed operator to operatorFunction====`)
            operatorsInputControl('/')
        }
        else 
        {   
            console.log(`======keypressed operator called setResult()====`)
            runningChainedOperations = true
            console.log(`runningChainedOperations: ${runningChainedOperations}`)
            operatorCache = '/'
            console.log(`operatorCache = '/'`)
            setResult(false) // setResult(calledEqualsButton = false)
        }
    }
    
    if (e.code === 'Equal' || e.code === 'Enter')
    {
        if (!calledAddWithShift && startedSecondNumberInput)
        {
            console.log(`pressed EQUALS`)
            setResult(true)
        }
    }
    
    if (e.code === 'NumpadDecimal' || e.keyCode == 190)
    {
        console.log(`pressed DECIMAL POINT`)
        digitsInputControl('.')
    }
    
    if (e.code === 'Delete' || e.code === 'Backspace')
    {
        console.log(`called backspace from keyboard`)
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
    console.log(`\n====== setResult(calledEqualsButton) ======`)
    console.log(`calledEqualsButton: ${calledEqualsButton}`)
    console.log(`received mathOperation: ${mathOperation}`)
    console.log(`typeof(mathOPeration): ${typeof(mathOperation)}`)
    
    if (calledEqualsButton == true)
    {
        calledResultFromEqualsButton = true
    }
    console.log(`calledResultFromEqualsButton: ${calledResultFromEqualsButton}`)

    console.log(`currentResult: ${currentResult}`)
    console.log(`currentResultIsNegative: ${currentResultIsNegative}`)

    for (i = 0; i < mathOperation.length; i++)
    {   
        if (mathOperation[i] === "+" || mathOperation[i] === "-" 
        || mathOperation[i] === "*" || mathOperation[i] === "/")
        {
            
            if (currentResultIsNegative)
            {   
                mathOperation.shift()
                console.log(`mathOperation: ${mathOperation}`)
                mathOperation[0] = parseInt(mathOperation[0])
                secondNumberDigitsArray = mathOperation.splice(i)
                const operatorIndex = mathOperation.length -1
                operator = mathOperation[operatorIndex]
                mathOperation.splice(operatorIndex, 1)
                firstNumberDigitsArray = mathOperation
            }
            else 
            {
                console.log(`mathOperation: ${mathOperation}`)
                secondNumberDigitsArray = mathOperation.splice(i+1)
                const operatorIndex = mathOperation.length - 1
                operator = mathOperation[operatorIndex]
                mathOperation.splice(operatorIndex, 1)
                firstNumberDigitsArray = mathOperation
            }
        }
    }
    console.log(`firstNumberDigitsArray: ${firstNumberDigitsArray}`)
    console.log(`secondNumberDigitsArray: ${firstNumberDigitsArray}`)
    
    for (j = 0; j < firstNumberDigitsArray.length; j++)
    {
        firstNumberDigitsString += firstNumberDigitsArray[j]
    }

    console.log(`currentResultIsNegative\nfirstNumberDigitsArray: ${firstNumberDigitsArray}`)

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

    console.log(`result = operate(firstNumber, operator, secondNumber)`)
    console.log(`result = operate(${firstNumber}, ${operator}, ${secondNumber})`)
    console.log(`typeof(firstNumber): ${typeof(firstNumber)}`)
    console.log(`typeof(operator): ${typeof(operator)}`)
    console.log(`typeof(secondNumber): ${typeof(secondNumber)}`)
    console.log(`typeof(result): ${typeof(result)}`)

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
        console.log(`if (runningChainedOperations) {...} ==entered==`)
        console.log(`runningChainedOperations: ${runningChainedOperations}`)
    
        display.value = result
        console.log(`display.value = result`)
        console.log(`result: ${result}`)
        console.log(`typeof(result): ${typeof(result)}`)
        console.log(`display.value = ${display.value}`)
        
        if (operatorCache === '/')
        {
            display.value += '÷'
        }
        else
        {
            display.value += operatorCache
        }
        
        console.log(`display.value += operatorCache`)
        console.log(`operatorCache: ${operatorCache}`)
        console.log(`typeof(operatorCache): ${typeof(operatorCache)}`)
        console.log(`display.value = ${display.value}`)
    }
    else 
    {
        console.log(`if (runningChainedOperations) else{...} ==entered==`)

        display.value = result
        console.log(`display.value = result`)
        console.log(`result: ${result}`)
        console.log(`typeof(result): ${typeof(result)}`)
        console.log(`display.value = ${display.value}`)
    }

    currentResult = result
    console.log(`currentResult = result`)
    console.log(`currentResult: ${currentResult}`)
    console.log(`typeof(currentResult): ${typeof(currentResult)}`)
    console.log(`currentResultIsNegative: ${currentResultIsNegative}`)
    
    if (currentResult === 0)
    {
        clearDisplay()
        clearResult()
        clearPartOfControlVariables()
    }
    else if (currentResult < 0)
    {
        currentResultIsNegative = true
        console.log(`===entered === else if (currentResult < 0)
        {
            currentResultIsNegative = true
        }
    `)
    }

    if (calledResultFromEqualsButton)
    {
        clearPartOfControlVariables()
        console.log(`if (calledResultFromEqualsButton)
        {
            clearPartOfControlVariables()
        }`)
    }

    updateOperationPairData()
    clearResult()
    console.log(`currentResult: ${currentResult}`)
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

    console.log(`\n=== setResultAsFirstNumber() \ncalled by updateOperationPairData() ====`)

    //from setResultAsFirstNumber()
    console.log(`mathOperation = [] -> reset mathOperation array`)
    console.log(`result: ${result}`)
    console.log(`tyepof(result): ${typeof(result)}`)
    console.log(`resultDigitsString = result.toString()`)
    console.log(`for (i = 0; i < resultDigitsString.length; i++)
    {
        mathOperation[i] = resultDigitsString[i]
    }`)
    console.log(`mathOperation: ${mathOperation}`)
    console.log(`typeof(mathOperation): ${typeof(mathOperation)}`)

    console.log(`for (j = 0; j < mathOperation.length; j++)
    {
        if(mathOperation[j] != ".")
        {
            mathOperation[j] = parseInt(mathOperation[j])
        }
    }`)
    console.log(` if (runningChainedOperations)
    {
        mathOperation.push(operatorCache)
    }`)
    console.log(`mathOperation: ${mathOperation}`)
    console.log(`typeof(mathOperation): ${typeof(mathOperation)}`)
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

    console.log(`\n==== updateOperationPairData() ====`)
    console.log(`firstNumberDigitsArray: ${firstNumberDigitsArray}`)
    console.log(`secondNumberDigitsArray: ${secondNumberDigitsArray}`)
    console.log(`firstNumberDigitsString: ${firstNumberDigitsString}`)
    console.log(`secondNumberDigitsString: ${secondNumberDigitsString}`)
    console.log(`operatorCache: ${operatorCache}`)
    console.log(`firstNumberIsFloat: ${firstNumberIsFloat}`)
    console.log(`secondNumberIsFloat: ${secondNumberIsFloat}`)
    console.log(`operatorIsSet: ${operatorIsSet}`)
    console.log(`runningChainedOperations: ${runningChainedOperations}`)
    console.log(`firstNumber: ${firstNumber}`)
    console.log(`secondNumber: ${secondNumber}`)
    console.log(`operator: ${operator}`)
    console.log(`startedSecondNumberInput: ${startedSecondNumberInput}`)
    console.log(`result: ${result}`)
    console.log(`tyepof(result): ${typeof(result)}`)
    console.log(`for (i = 0; i < 4; i++)
    {
        operators[i].disabled = false
    }`)
}