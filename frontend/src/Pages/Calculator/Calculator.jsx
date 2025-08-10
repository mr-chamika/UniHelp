import { useEffect, useState } from 'react';
import './Calculator.css';
import { evaluate, isNumber } from 'mathjs';

const Calculator = () => {

    const [gpa, setGpa] = useState(0);

    const [formBlocks, setFormBlocks] = useState([

        { id: Math.random(), module: '', credit: '', grade: '', result: '' }

    ]);

    const handleAddBlock = () => {
        setFormBlocks([...formBlocks, { id: Math.random(), module: '', credit: '', grade: '', result: '' }]);
    };

    const handleRemoveBlock = (id) => {
        setFormBlocks(formBlocks.filter(block => block.id !== id));
    };


    const [active, setActive] = useState(1);
    const [input, setInput] = useState('');
    const [exp, setExp] = useState('');
    const [ans, setAns] = useState('');
    const [guid, setGuid] = useState(false);
    const [logState, setLogState] = useState({ active: false, valueDone: false });

    const handleInput = (val) => {
        try {
            if (
                ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '√', 'Pi', 'sin', 'cos', 'tan', 'log', '('].includes(val) &&
                input === ''
            ) {
                if (val === 'Pi') {
                    setInput('π');
                    setExp('pi');
                } else if (val === '√') {
                    setInput('√(');
                    setExp('sqrt(');
                } else if (val === '(') {
                    setInput('(');
                    setExp('(');
                } else if (['sin', 'cos', 'tan', 'log'].includes(val)) {
                    setInput(`${val}(`);
                    setExp(`${val}(`);
                    if (val === 'log') {
                        setLogState({ active: true, valueDone: false });
                        setGuid(true);
                    }
                } else if (val === '-') {
                    setInput('-');
                    setExp('-');
                } else {
                    setInput(val);
                    setExp(val);
                }
            }

            else if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Pi'].includes(val)) {
                let updatedInput = input;
                let updatedExp = exp;

                if (logState.active) {
                    if (val === 'Pi') {
                        updatedInput += 'π';
                        updatedExp += 'pi';
                    } else {
                        updatedInput += val;
                        updatedExp += val;
                    }
                    setInput(updatedInput);
                    setExp(updatedExp);
                    return;
                }

                if (val === 'Pi') {
                    updatedInput += 'π';
                    updatedExp += 'pi';
                } else {
                    updatedInput += val;
                    updatedExp += val;
                }

                setInput(updatedInput);
                setExp(updatedExp);
                return;
            }

            else if (val === '.' && logState.active && !logState.valueDone) {
                setInput(input + ',');
                setExp(exp + ',');
                setLogState({ active: true, valueDone: true });
                return;
            }

            else if (
                ['+', '-', 'x', '/', '.', '(', ')', '^', 'mod', 'pi', '√', 'sin', 'cos', 'tan', 'log'].includes(val)
            ) {
                if (val === '+') {
                    setInput(input + ' + ');
                    setExp(exp + ' + ');
                } else if (val === '-') {
                    setInput(input + ' - ');
                    setExp(exp + ' - ');
                } else if (val === 'x') {
                    setInput(input + ' x ');
                    setExp(exp + ' * ');
                } else if (val === '/') {
                    setInput(input + ' / ');
                    setExp(exp + ' / ');
                } else if (val === '.') {
                    setInput(input + '.');
                    setExp(exp + '.');
                } else if (val === '(') {
                    setInput(input + '(');
                    setExp(exp + '(');
                } else if (val === ')') {
                    setInput(input + ')');
                    setExp(exp + ')');
                    if (logState.active) {
                        setLogState({ active: false, valueDone: false });
                        setGuid(false);
                    }
                } else if (val === '^') {
                    setInput(input + '^');
                    setExp(exp + '^');
                } else if (val === 'mod') {
                    setInput(input + ' mod ');
                    setExp(exp + ' % ');
                } else if (val === 'pi') {
                    setInput(input + 'π');
                    setExp(exp + 'pi');
                } else if (val === '√') {
                    setInput(input + '√(');
                    setExp(exp + 'sqrt(');
                } else if (['sin', 'cos', 'tan', 'log'].includes(val)) {
                    setInput(input + val + '(');
                    setExp(exp + val + '(');
                    if (val === 'log') {
                        setLogState({ active: true, valueDone: false });
                        setGuid(true);
                    }
                }
            }

            else if (val === '=') {
                if (input.trim().endsWith('√') || input.trim().endsWith('+') || input.trim().endsWith('-')) {
                    setAns('invalid syntax');
                } else {

                    const result = evaluate(exp);
                    if (Math.abs(result) < 1e-10) {
                        setAns(0);
                    } else if (Math.abs(result) > 1e10) {
                        setAns('Infinity');
                    } else if (Number.isInteger(result)) {
                        setAns(result);
                    } else {
                        setAns(Number(result.toFixed(5)));
                    }

                    setLogState({ active: false, valueDone: false });
                }
            } else {
                setInput('Invalid');
            }
        } catch (error) {
            setAns('Syntax error');
        }
    };

    const submit = () => {

        console.log(formBlocks)

    }

    const getGpa = (formBlocks) => {

        var Credits = 0;
        var totalPoints = 0;

        formBlocks.forEach(block => {
            if (block.credit && block.result) {
                Credits += parseFloat(block.credit);
                totalPoints += parseFloat(block.result) * parseFloat(block.credit);
            }
        });

        if (Credits == 0) {

            setGpa(0);
            return;

        }

        const x = totalPoints / Credits;
        setGpa(x.toFixed(6));
    }

    useEffect(() => {

        getGpa(formBlocks);

    }, [formBlocks]);

    return (
        <div className="c-calculator">
            <div className="c-calculator-content">
                <nav>
                    <button className={active === 1 ? 'active' : ''} onClick={() => setActive(1)}>Scientific calculator</button>
                    <button className={active === 2 ? 'active' : ''} onClick={() => setActive(2)}>GPA calculator</button>
                </nav>

                <div className="in">
                    {active === 1 && (
                        <div className="wrap">
                            <div className="display">
                                <input type="text" value={input} readOnly />
                                {ans !== '' && <p>{ans}</p>}
                            </div>
                            <div className="pad">
                                <div className="left">
                                    <div className="1">
                                        <button onClick={() => handleInput('+')}>+</button>
                                        <button onClick={() => handleInput('mod')}>mod</button>
                                        <button onClick={() => {
                                            setInput(input.slice(0, -1));
                                            setExp(exp.slice(0, -1));
                                        }}>C</button>
                                        <button onClick={() => {
                                            setInput('');
                                            setExp('');
                                            setAns('');
                                            setGuid(false);
                                            setLogState({ active: false, valueDone: false });
                                        }}>AC</button>
                                    </div>
                                    <div className="2">
                                        <button onClick={() => handleInput('-')}>-</button>
                                        <button onClick={() => handleInput('log')}>log</button>
                                        <button onClick={() => handleInput('√')}>√</button>
                                        <button onClick={() => handleInput('sin')}>sin</button>
                                    </div>
                                    <div className="3">
                                        <button onClick={() => handleInput('x')}>x</button>
                                        <button onClick={() => handleInput('Pi')}>π</button>
                                        <button onClick={() => handleInput('^')}>^</button>
                                        <button onClick={() => handleInput('cos')}>cos</button>
                                    </div>
                                    <div className="4">
                                        <button onClick={() => handleInput('/')}>/</button>
                                        <button onClick={() => handleInput('(')}>(</button>
                                        <button onClick={() => handleInput(')')}>)</button>
                                        <button onClick={() => handleInput('tan')}>tan</button>
                                    </div>
                                </div>
                                <div className="right">
                                    <div className="1">
                                        <button onClick={() => handleInput('1')}>1</button>
                                        <button onClick={() => handleInput('2')}>2</button>
                                        <button onClick={() => handleInput('3')}>3</button>
                                    </div>
                                    <div className="2">
                                        <button onClick={() => handleInput('4')}>4</button>
                                        <button onClick={() => handleInput('5')}>5</button>
                                        <button onClick={() => handleInput('6')}>6</button>
                                    </div>
                                    <div className="3">
                                        <button onClick={() => handleInput('7')}>7</button>
                                        <button onClick={() => handleInput('8')}>8</button>
                                        <button onClick={() => handleInput('9')}>9</button>
                                    </div>
                                    <div className="4">
                                        <button onClick={() => handleInput('.')}>.</button>
                                        <button onClick={() => handleInput('0')}>0</button>
                                        <button onClick={() => { handleInput('='); setGuid(false); }}> = </button>
                                    </div>
                                </div>
                            </div>
                            {guid && <p className='under'>log(value, base)</p>}
                        </div>
                    )}
                    {active === 2 &&

                        <div className="wrapb">
                            <div className="content">
                                <div className='init'>
                                    {formBlocks.map((block, index) => (
                                        <div className="block" key={block.id}>
                                            <form >
                                                <select className='module' value={`${block.credit}|${block.module}`} onChange={(e) => { /* const [module, credit] = e.target.value.split('|'); */ const setting = [...formBlocks]; setting[index].module = e.target.value.split('|')[1]; setting[index].credit = e.target.value.split('|')[0]; setFormBlocks(setting); }}>
                                                    <option value="0" hidden>Module</option>
                                                    <option value="2|Management">Management</option>
                                                    <option value="2|Software Quality Assurance">Software Quality Assurance</option>
                                                    <option value="2|Software Project Management">Software Project Management</option>
                                                    <option value="3|Human Computer Interaction">Human Computer Interaction</option>
                                                    <option value="3|Mobile Application Development">Mobile Application Development</option>
                                                    <option value="3|Group Project II">Group Project II</option>
                                                    <option value="2|Professional Practice">Professional Practice</option>
                                                </select>

                                                <select className='credit' value={`${block.grade}|${block.result}`} onChange={(e) => { const setting = [...formBlocks]; setting[index].grade = e.target.value.split('|')[0]; setting[index].result = e.target.value.split('|')[1]; setFormBlocks(setting); }}>
                                                    <option value="0" hidden>Grade</option>
                                                    <option value="A+|4">A+</option>
                                                    <option value="A|4">A</option>
                                                    <option value="A-|3.7">A-</option>
                                                    <option value="B+|3.3">B+</option>
                                                    <option value="B|3">B</option>
                                                    <option value="B-|2.7">B-</option>
                                                    <option value="C+|2.3">C+</option>
                                                    <option value="C|2">C</option>
                                                    <option value="C-|1.7">C-</option>
                                                    <option value="D+|1.3">D+</option>
                                                    <option value="D|1">D</option>
                                                </select>
                                                {formBlocks.length != 1 &&
                                                    <button onClick={() => handleRemoveBlock(block.id)}>-</button>
                                                }
                                            </form>
                                        </div>
                                    ))}
                                </div>
                                <div className="buts">
                                    <button className='add' onClick={handleAddBlock}>+</button>

                                </div>
                                <div className="footer">

                                    <button className='submit' onClick={submit}>submit</button>
                                </div>
                            </div>

                            {gpa != 0 &&

                                <div className="gpa">

                                    <span>Your GPA is : {gpa}</span>

                                </div>

                            }

                        </div>

                    }
                </div>
            </div>
        </div>
    );
};

export default Calculator;
