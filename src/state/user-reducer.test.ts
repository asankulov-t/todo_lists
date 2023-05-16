import {userReducer} from './user-reducer';

test('user reducer should increment only age', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Dimych' };

    const endState = userReducer(startState, { type: 'INCREMENT-AGE' })

    expect(endState.age).toBe(21);
    expect(endState.childrenCount).toBe(2);
});

test('user reducer should increment only childrenCount', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Dimych' };
    const res=userReducer(startState, {type:'INCREMENT-CHILDRENCOUNT'})
    expect(res.childrenCount).toBe(3)
    // your code here
});

test('user reducer should change name', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Dimych' };
    const res=userReducer(startState, {type:'CHANGE-NAME',name:'Talant'})
    expect(res.name).toBe('Talant')
    // your code here
});
