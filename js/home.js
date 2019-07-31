import quizData from './quiz-data.js';

console.log(quizData);

const h1 = document.createElement('h1');
h1.classList.add('main-title');
h1.textContent = quizData.title;
const form = document.querySelector(".quiz-form");
form.before(h1);

function handleSubmit(e) {
  e.preventDefault();
  const inputsChecked = document.querySelectorAll('input:checked');

}

form.addEventListener("submit", handleSubmit);

let fragment = document.createDocumentFragment();


quizData.questions.forEach((questionObj, index) => {
  const section = document.createElement('section');
  section.classList.add('question-section');
  const h3 = document.createElement('h3');
  h3.classList.add('question-title');
  h3.textContent = questionObj.question;
  const ol = document.createElement('ol');
  ol.classList.add('ol-question');
  questionObj.choices.forEach((choice, value) => {
    ol.append(createChoice(choice, index, value));
  })
  section.append(h3, ol);
  fragment.append(section);
})

function createChoice(choice, index, value) {
  const li = document.createElement('li');
  li.classList.add('li-question');
  const label = document.createElement('label');
  label.classList.add('label');
  label.textContent = choice;
  const input = document.createElement('input');
  input.classList.add(value);
  input.setAttribute("required", true);
  input.setAttribute('type', 'radio');
  input.setAttribute('name', index);
  input.setAttribute('value', value);
  label.prepend(input);
  li.prepend(label);
  return li;

}

form.prepend(fragment);


function handleChange(event) {
  event.preventDefault();

  const {
    elements
  } = event.currentTarget;
  rm.elements.input.value;
  const data = {
    valuesList
  };

  console.log(data);
}

const p = document.createElement('p');
form.append(p);

function handleSubmitWithFormData(event) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);

  const userAnswer = [];

  formData.forEach((value, name) => {
    userAnswer[name] = Number(value)
  })
  console.log('userAnswer :', userAnswer);

  const rightAnswer = quizData.questions.map(element => element.answer)
  console.log('rightAnswer :', rightAnswer);

  let final = 0;
  for (let i = 0; i < rightAnswer.length; i++) {
    if (userAnswer[i] === rightAnswer[i]) {
      console.log(rightAnswer[i]);
      final += 16.66;
    } else {
      final += 0;
    }
  }

  if (final >= 80) {
    p.classList.remove('p_final_not_ok');
    p.classList.add('p_final_ok');
    p.textContent = (`Тест пройден успешно, оценка - ${Math.ceil(final)}%`);
  } else { 
    p.classList.remove('p_final_ok');
    p.classList.add('final_not_ok');
    p.textContent = (`Тест провален, оценка - ${Math.ceil(final)}%. Попробуй еще раз.`);
  }
 console.log('final :', Math.ceil(final));

form.reset();

}
form.addEventListener('submit', handleSubmitWithFormData);

