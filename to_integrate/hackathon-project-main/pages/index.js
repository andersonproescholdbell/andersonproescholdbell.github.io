import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { points, getFace, getSnacks } from '../logic/points.js'
import React, { useEffect, useState } from 'react';
import { ReactDOM } from 'react-dom';

export default function Home() {
  const [userPoints, setUserPoints] = useState(0);
  const [selected, setSelected] = useState(-1);
  const [countdown, setCountdown] = useState(10);
  const [correctText0, setCorrectText0] = useState('');
  const [incorrectText0, setIncorrectText0] = useState('');
  const [correctText1, setCorrectText1] = useState('');
  const [incorrectText1, setIncorrectText1] = useState('');
  const [iteration, setIteration] = useState(0);
  const [clickable, setClickable] = useState(true);
  const [title, setTitle] = useState('Choose the REAL human');

  const [img0, setImg0] = useState();
  const [img1, setImg1] = useState();

  function end() {
    console.log('here')
    document.querySelector('#countdown').style.display = 'none';
    document.querySelector('#points').style.display = 'none';
    // document.querySelector(`.${styles.title}`).style.display = 'none';
    document.querySelector(`.${styles.grid}`).style.display = 'none';
    document.querySelector(`.${styles.title}`).style.fontSize = '30px';
    document.querySelector(`.${styles.title}`).style.position = 'absolute';
    document.querySelector(`.${styles.title}`).style.top = '30%';
    document.querySelector(`.${styles.title}`).style.margin = '0 30px 0 30px';
    setTitle('Your turns are up for this pump, thank you for playing! You can use the points you earned on the variety of snacks we offer.')
  }

  function toggleDark() {
    if (document.querySelector('body').style.background != 'black') {
      document.querySelector('body').style.background = 'black';
      document.querySelector('body').style.color = 'white';
      document.querySelector('#countdownText').style.color = 'white';
      document.documentElement.style.setProperty('--stroke', 'white');
    } else {
      document.querySelector('body').style.background = 'rgb(221, 221, 221)';
      document.querySelector('body').style.color = 'black';
      document.querySelector('#countdownText').style.color = 'black';
      document.documentElement.style.setProperty('--stroke', 'black');
    }
  }

  function reset_animation() {
    var el = document.querySelector('svg circle');
    el.style.animationName = "none";

    requestAnimationFrame(() => {
      setTimeout(() => {
        el.style.animationName = ""
      }, 0);
    });

    el.style.animationPlayState = '';
  }

  function resetText() {
    setCorrectText0('');
    setCorrectText1('');
    setIncorrectText0('');
    setIncorrectText1('');
  }

  function setFaces() {
    setImg0(getFace());
    setImg1(getFace());
  }

  function resetBorders() {
    document.querySelectorAll('.photo')[0].style.cssText = "border: ;";
    document.querySelectorAll('.photo')[1].style.cssText = "border: ;";
  }

  useEffect(() => {
    if (iteration == 0 && countdown == 10) setFaces();
    setTimeout(() => {
      if (countdown-1 == 0) {
        document.querySelector('svg circle').style.animationPlayState = 'paused';
        document.querySelector('svg circle').style.animationDelay = '0s';
      }

      if (countdown >= 1) setCountdown(countdown-1);

      if (countdown == 0) {
        if (iteration == 9) {
          end();
          return;
        }

        setCountdown(10);
        if (iteration%2 == 0) {
          setClickable(false);
          result();
        } else {
          setTitle('Choose the REAL human')
          resetText();
          setClickable(true);
          setFaces();
          setSelected(-1);
          resetBorders();
        }
        setIteration(iteration+1);
        reset_animation();
      }
    }, 1000);
  }, [countdown]);

  function percent(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function result() {
    let correct = points(selected);
    let t = `${percent(40, 60)}% players chose this option`;
    
    if (selected >= 0) {
      if (correct) {
        setTitle('Well done!');
        document.querySelectorAll('.photo')[selected].style.cssText = "border: 5px solid green;";
        (selected == 0) ? setCorrectText0(t) : setCorrectText1(t);
        setUserPoints(userPoints+10);
      } else {
        setTitle('Not quite...');
        document.querySelectorAll('.photo')[selected].style.cssText = "border: 5px solid red;";
        (selected == 0) ? setIncorrectText0(t) : setIncorrectText1(t);
      }
    } else {
      setTitle('Select an option next time!');
      (correct = 0) ? setCorrectText0(t) : setCorrectText1(t);
    }
  }

  function selectImage(selected) {
    if (clickable) {
      setSelected(selected);
      document.querySelectorAll('.photo')[0].style.cssText = "";
      document.querySelectorAll('.photo')[1].style.cssText = "";
      document.querySelectorAll('.photo')[selected].style.cssText = "border: 5px solid white;";
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Real Human</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <div id="countdown" className={styles.countdown}>
          <div id="countdownText" className={styles.countdownText}>{countdown}</div>
          <svg className={styles.svg}>
            <circle r="45" cx="50" cy="50"></circle>
          </svg>
        </div>

        <h1 className={styles.title}>{title}</h1>
        
        <div className={styles.grid}>

          <div>
            <div onClick={() => selectImage(0)} className={`${styles.card} photo`}>
              <Image
                className={styles.img}
                src={img0}
                alt="Picture"
                width="300px"
                height="300px"
              />
            </div>

            <h3 className={styles.correctText}>{correctText0}</h3>
            <h3 className={styles.incorrectText}>{incorrectText0}</h3>
          </div>
          
          <div>
            <div onClick={() => selectImage(1)} className={`${styles.card} photo`}>
              <Image
                className={styles.img}
                src={img1}
                alt="Picture"
                width="300px"
                height="300px"
                onLoad={ () => {  } }
              />
            </div>

            <h3 className={styles.correctText}>{correctText1}</h3>
            <h3 className={styles.incorrectText}>{incorrectText1}</h3>
          </div>
    
        </div>

        <h2 id="points">Points: {userPoints}</h2>

        <div className={styles.dark}>
            <label class="switch">
              <input type="checkbox" onChange={() => {toggleDark()}}></input>
              <span class="slider round"></span>
            </label>
        </div>

      </main>
    </div>
  )
}
