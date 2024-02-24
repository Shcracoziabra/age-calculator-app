# Frontend Mentor - Age calculator app solution

This is a solution to the [Age calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/age-calculator-app-dF9DFFpj-Q). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View an age in years, months, and days after submitting a valid date through the form
- Receive validation errors if:
  - Any field is empty when the form is submitted
  - The day number is not between 1-31
  - The month number is not between 1-12
  - The year is in the future
  - The date is invalid e.g. 31/04/1991 (there are 30 days in April)
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: See the age numbers animate to their final number when the form is submitted

### Screenshot

![](./screenshot.jpg)

### Links

- Solution URL: [GitHub](https://github.com/Shcracoziabra/age-calculator-app)
- Live Site URL: [Netlify](https://shcraco-age-calculator.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Vanilla JS
- CSS media queries for different screen sizes

### What I learned

In this challenge I practised to use logic while counting age.
Did it using JavaScript built-in `Date` object and it's methods.

```js
// year, month, day - corresponded inputs

const birthday = new Date(`${year.value}-${month.value}-${day.value}`);

const birthdayYear = birthday.getFullYear();
const birthdayMonth = birthday.getMonth();
const birthdayDate = birthday.getDate();
```
I performed input validation with checking for strings of spaces and empty strings.
Besides, validated input groups to respond to incorrect date parts.
Set user age elements' width with JS based on the digits length to avoid elements "jumping" during the animation.
Finally, added a small button to reset the form.

### Useful resources

- [MDN web docs about Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) - This helped me to recollect Date object methods.

## Author

- GitHub - [Tetiana B.](https://github.com/Shcracoziabra)
- Frontend Mentor - [@Shcracoziabra](https://www.frontendmentor.io/profile/Shcracoziabra)
