import React, { useEffect, useState } from 'react';

function Timer({ verifyExistDate, setDeal, setHiddenProducts }) {
  const [timer, setTimer] = useState();

  useEffect(() => {
    const endTime = new Date(verifyExistDate).getTime();
    const intervaler = setInterval(() => {
      var _second = 1000;
      var _minute = _second * 60;
      var _hour = _minute * 60;
      var _day = _hour * 24;

      var now = new Date();
      var distance = endTime - now;
      if (distance < 0) {
        clearInterval(intervaler);
        setTimer('Tiempo Agotado!');
        setHiddenProducts(false);
        setTimeout(() => {
          setDeal(null);
        }, 6000);
        return;
      }
      var hours = Math.floor((distance % _day) / _hour);
      var minutes = Math.floor((distance % _hour) / _minute);
      var seconds = Math.floor((distance % _minute) / _second);
      setTimer(`${hours}hs - ${minutes}min - ${seconds}seg`);
    }, 1000);
  }, []);

  return <>{timer}</>;
}

export default Timer;
