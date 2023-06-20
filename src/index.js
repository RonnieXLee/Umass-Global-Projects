import React from 'react';
import ReactDOM from 'react-dom';
import Fruits from './fruits';
import { choice, remove } from './helpers';

const fruit = choice(Fruits);

console.log(`I'd like one ${fruit}, please`);
console.log(`Here you go: ${fruit}`);
console.log(`Delicious! May I have another?`);

const remaining = remove(fruit, Fruits);

console.log(`I'm sorry, we're all out. We have ${remaining.length} left.`);

ReactDOM.render(
  <React.StrictMode>
    <div>
      <p>I'd like one {fruit}, please</p>
      <p>Here you go: {fruit}</p>
      <p>Delicious! May I have another?</p>
      <p>I'm sorry, we're all out. We have {remaining.length} left.</p>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
