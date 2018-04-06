import chalk from 'chalk';

const prefix = chalk`{blue wpm} `;

export const info = (text: string, logs = true) => {
  if (!logs) return;
  console.log(chalk`${prefix}{bgWhite.black INFO} ${text}`);
};

export const success = (text: string, logs = true) => {
  if (!logs) return;
  console.log(chalk`${prefix}{bgGreen.black SUCCESS} ✨  ${text}`);
};

export const error = (text: string, logs = true) => {
  if (!logs) return;
  console.log(chalk`${prefix}{bgRed.black ERROR} ${text}`);
};
