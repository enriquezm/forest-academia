#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createStack } from './stacks.js';
import { sleep } from './utils.js';

async function intro() {
    figlet.text(
        "Forest Academia",
        {
            horizontalLayout: "default",
            verticalLayout: "default",
            width: 80,
            whitespaceBreak: true,
        },
        function (err, data) {
            if (err) {
                console.log(chalk.red("Something went wrong..."));
                console.dir(err);
                return;
            }

            console.log(chalk.green(data));
        }
    );

    await sleep(2000);

    const answer = await inquirer.prompt({
        name: 'intro',
        type: 'confirm',
        message: "Welcome to Forest Academia, shall we start your study sesh?"
    });

    if (!answer.intro) {
        console.log(chalk.green('Session ended. Come back soon!\n'));
        process.exit(1);
    }
};

async function outro() {
    const glitchGreeting = chalkAnimation.glitch('Study sesh over congrats!\n');

    await sleep();

    glitchGreeting.stop();
};

async function askQuestion(question, index, total) {
    const answer = await inquirer.prompt({
        name: question.name,
        type: 'confirm',
        message: `(${index + 1}/${total}) ${chalk.yellow(question.message)}`,
    });

    return answer[question.name];
}

async function moveOnPrompt() {
    const answer = await inquirer.prompt({
        name: 'mo',
        type: 'confirm',
        message: 'Move on?'
    });

    if (!answer.mo) {
        console.log(chalk.green('Session ended.\n'));
        process.exit(1);
    }
}

async function askQuestionsFromStack(questions, total) {
    for (const question of questions) {
        const index = questions.indexOf(question);
        const answer = await askQuestion(question, index, total);

        if (answer) {
            console.log(chalk.green(`${question.answer}\n`));
            await moveOnPrompt();
        }
    }
}

const stack1 = createStack();

await intro();
await askQuestionsFromStack(stack1.getStack(), stack1.getStackLength());
await outro();

