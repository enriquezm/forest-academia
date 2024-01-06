const stack1 = [
    {
        name: 'q1', 
        message: 'What is the process by which trees absorb water from the soil and release it into the air? Flip?', 
        answer: 'Transpiration'
    },
    { 
        name: 'q2',
        message: 'Which animal is known for its strong, dam-building behavior in forest ecosystems? Flip?',
        answer: 'Beaver'
    },
    { 
        name: 'q3',
        message: 'What is the term for the process by which green plants convert sunlight into energy for growth? Flip?',
        answer: 'Photosynthesis'
    },
];

class Stack {
    constructor(data) {
        this.data = data;
    }

    getStack() {
        return this.data;
    }

    getStackLength() {
        return this.data.length;
    }
}

export const createStack = () => {
    return new Stack(stack1);
};