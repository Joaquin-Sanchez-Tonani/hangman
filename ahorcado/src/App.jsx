import './App.css'
import { useState, useEffect } from 'react'

function App() {
    const [word, setWord] = useState('');
    const [guessedLetters, setGuessedLetters] = useState([' ']);
    const [unguessedLetters, setUnGuessedLetters] = useState([]);

    const [attemptsLeft, setAttemptsLeft] = useState(6);
    const [gameResult, setGameResult] = useState(null);

    const words = [
        'afganistan', 'albania', 'alemania', 'andorra', 'angola', 'antigua y barbuda', 'arabia saudita',
        'argelia', 'argentina', 'armenia', 'australia', 'austria', 'azerbaiyan', 'bahamas', 'bangladesh',
        'barbados', 'barein', 'belgica', 'belice', 'benin', 'bielorrusia', 'birmania', 'bolivia',
        'bosnia y herzegovina', 'botsuana', 'brasil', 'brunei', 'bulgaria', 'burkina faso', 'burundi',
        'butan', 'cabo verde', 'camboya', 'camerun', 'canada', 'catar', 'chad', 'chile', 'china', 'chipre',
        'ciudad del vaticano', 'colombia', 'comoras', 'corea del norte', 'corea del sur', 'costa de marfil',
        'costa rica', 'croacia', 'cuba', 'dinamarca', 'dominica', 'ecuador', 'egipto', 'el salvador',
        'emiratos arabes unidos', 'eritrea', 'eslovaquia', 'eslovenia', 'espana', 'estados unidos', 'estonia',
        'etiopia', 'filipinas', 'finlandia', 'fiyi', 'francia', 'gabon', 'gambia', 'georgia', 'ghana',
        'granada', 'grecia', 'guatemala', 'guyana', 'guinea', 'guinea ecuatorial', 'guinea-bisau', 'haiti',
        'honduras', 'hungria', 'india', 'indonesia', 'irak', 'iran', 'irlanda', 'islandia', 'islas marshall',
        'islas salomon', 'israel', 'italia', 'jamaica', 'japon', 'jordania', 'kazajistan', 'kenia', 'kirguistan',
        'kiribati', 'kuwait', 'laos', 'lesoto', 'letonia', 'libano', 'liberia', 'libia', 'liechtenstein',
        'lituania', 'luxemburgo', 'madagascar', 'malasia', 'malaui', 'maldivas', 'mali', 'malta',
        'marruecos', 'mauricio', 'mauritania', 'mexico', 'micronesia', 'moldavia', 'monaco', 'mongolia',
        'montenegro', 'mozambique', 'namibia', 'nauru', 'nepal', 'nicaragua', 'niger', 'nigeria',
        'noruega', 'nueva zelanda', 'oman', 'paises bajos', 'pakistan', 'palaos', 'palestina', 'panama',
        'papua nueva guinea', 'paraguay', 'peru', 'polonia', 'portugal', 'reino unido', 'republica centroafricana',
        'republica checa', 'republica de macedonia', 'republica del congo', 'republica democratica del congo',
        'republica dominicana', 'republica sudafricana', 'ruanda', 'rumania', 'rusia', 'samoa',
        'san cristobal y nieves', 'san marino', 'san vicente y las granadinas', 'santa lucia',
        'santo tome y principe', 'senegal', 'serbia', 'seychelles', 'sierra leona', 'singapur', 'siria',
        'somalia', 'sri lanka', 'suazilandia', 'sudan', 'sudan del sur', 'suecia', 'suiza', 'surinam',
        'tailandia', 'tanzania', 'tayikistan', 'timor oriental', 'togo', 'tonga', 'trinidad y tobago',
        'tunez', 'turkmenistan', 'turquia', 'tuvalu', 'ucrania', 'uganda', 'uruguay', 'uzbekistan', 'vanuatu',
        'venezuela', 'vietnam', 'yemen', 'yibuti', 'zambia', 'zimbabue'
      ];
    const letters = 'qwertyuiop';
    const letterArray1 = letters.split('');

    const letters2 = 'asdfghjkl';
    const letterArray2 = letters2.split('');

    const letters3 = 'zxcvbnm';
    const letterArray3 = letters3.split('');

    const getWord = () => {
        const randomIndex = Math.floor(Math.random() * words.length);
        const randomWord = words[randomIndex];
        const wordArray = randomWord.split('');
        setWord(wordArray);
        setGuessedLetters([]);
        setUnGuessedLetters([])
        setAttemptsLeft(6);
        setGameResult(null);
    }

    const checkLetter = (e) => {
        if (e === ' ') {
            return;
        }
    
        if (word.includes(e)) {
            setGuessedLetters((prev) => [...prev, e]);
        } else {
            setUnGuessedLetters((prev) => [...prev, e]);
            setAttemptsLeft((prev) => prev - 1);
        }
    };
    
    useEffect(() => {
        if (word.length > 0) {
            const lettersToGuess = word.filter((letter) => letter !== ' ');
            const allLettersGuessed = lettersToGuess.every((letter) => guessedLetters.includes(letter));
    
            if (allLettersGuessed) {
                setGameResult('win');
            } else if (attemptsLeft <= 0) {
                setGameResult('lose');
            }
        }
    }, [guessedLetters, attemptsLeft, word]);
    
    useEffect(() => {
        if (gameResult === 'win') {
            alert('Congratulations! You won!');
        } else if (gameResult === 'lose') {
            alert('Sorry, you lost.');
        }
    }, [gameResult]);
    


    return (
        <div className='screen'>
            <div className='titulo'>
                <button className={!word ? 'hangman-button2' : 'hangman-button'} onClick={getWord}>{!word ? 'Start' : 'Change Word'}</button>
                {word &&<h1 className='hangman'>Hangman from countries</h1>}
            </div>
            
            {word !== '' && <div><div className='contenedor-espacios'>
                {word.map((letter, index) => (letter !== ' ' ?
                    <label key={index} className='cuadrado'>
                    {guessedLetters.includes(letter) ? letter : '_'}
                </label> : <div className='espaciado'></div>
                ))}
            </div>
            <div className='teclado'>
                <div>
                    {letterArray1.map((e, index) => (
                        <div key={index} onClick={() => checkLetter(e)} className={guessedLetters.includes(e) ? 'guessLetters' : (unguessedLetters.includes(e) ? 'unguessed' : 'letters')} id={index}>
                            {e}
                        </div>
                    ))}
                </div>
                <div>
                    {letterArray2.map((e, index) => (
                        <div key={index} onClick={() => checkLetter(e)} className={guessedLetters.includes(e) ? 'guessLetters' : (unguessedLetters.includes(e) ? 'unguessed' : 'letters')} id={index}>
                            {e}
                        </div>
                    ))}
                </div>
                <div>
                    {letterArray3.map((e, index) => (
                        <div key={index} onClick={() => checkLetter(e)} className={guessedLetters.includes(e) ? 'guessLetters' : (unguessedLetters.includes(e) ? 'unguessed' : 'letters')} id={index}>
                            {e}
                        </div>
                    ))}
                </div>
            </div>
            <p className='attemps'>Attempts Left: {attemptsLeft}</p>
            {attemptsLeft === 0 && <p className='wordIs'>The Word was {word}</p>}

            </div> }
        </div>
    )
}

export default App
