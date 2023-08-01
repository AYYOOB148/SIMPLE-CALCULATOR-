class Calculator {
    constructor(previousoperhandTextElement, currentoperhandTextElement) {
      this.previousoperhandTextElement = previousoperhandTextElement;
      this.currentoperhandTextElement = currentoperhandTextElement;
      this.clear();
    }
  
    clear() {
      this.currentoperhand = '';
      this.previousoperhand = '';
      this.operation = undefined;
    }
  
    delete() {
      this.currentoperhand = this.currentoperhand.toString().slice(0, -1);
    }
  
    appendNumber(number) {
      this.currentoperhand = this.currentoperhand.toString() + number.toString();
    }
  
    chooseOperation(operation) {
      if (this.currentoperhand === '') return;
      if (this.previousoperhand !== '') {
        this.compute();
      }
      this.operation = operation;
      this.previousoperhand = this.currentoperhand;
      this.currentoperhand = '';
    }
  
    compute() {
      let computation;
      const prev = parseFloat(this.previousoperhand);
      const current = parseFloat(this.currentoperhand);
      if (isNaN(prev) || isNaN(current)) return;
      switch (this.operation) {
        case '+':
          computation = prev + current;
          break;
        case '-':
          computation = prev - current;
          break;
        case '×':
          computation = prev * current;
          break;
        case '/':
          computation = prev / current;
          break;
        default:
          return;
      }
      this.currentoperhand = computation;
      this.operation = undefined;
      this.previousoperhand = '';
    }
  
    updateDisplay() {
      this.currentoperhandTextElement.innerText = this.currentoperhand;
      this.previousoperhandTextElement.innerText = this.previousoperhand;
    }
  }
  
  const numberbuttons = document.querySelectorAll('[data-number]');
  const operationbuttons = document.querySelectorAll('[data-operation]');
  const equalsbutton = document.querySelector('[data-equals]');
  const deletebutton = document.querySelector('[data-delete]');
  const allclearbutton = document.querySelector('[data-all-clear]');
  const previousoperhandTextElement = document.querySelector('[data-previous-operhand]');
  const currentoperhandTextElement = document.querySelector('[data-current-operhand]');
  
  const calculator = new Calculator(previousoperhandTextElement, currentoperhandTextElement);
  
  numberbuttons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText);
      calculator.updateDisplay();
    });
  });
  
  operationbuttons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText);
      calculator.updateDisplay();
    });
  });
  
  equalsbutton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
  });
  
  allclearbutton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
  });
  
  deletebutton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
  });