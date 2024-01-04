#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import { test1Data } from './testData.js';
import { sleep, shuffle } from './utils.js';

async function intro() {
    const glitchGreeting = chalkAnimation.glitch('hello there\n');

    await sleep();

    glitchGreeting.stop();
};

async function question1() {
    const { question, choices } = test1Data[0];
    const correctAnswer = choices[0];

    const answers = await inquirer.prompt({
        name: 'q1',
        type: 'list',
        message: question,
        choices: shuffle(choices)
    });

    return handleAnswer(answers.q1 === correctAnswer);
};

async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();
    if (isCorrect) {
        spinner.success({
            text: `Nice job! You're correct!`,
        });
    } else {
        spinner.error({
            text: `WRong!`,
        });
        process.exit(1);
    }
};

// await intro();

await question1();

