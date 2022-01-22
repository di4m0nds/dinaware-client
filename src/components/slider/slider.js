import { useState, useEffect } from 'react';
import axios from 'axios';
import { Slider, Caption, Slide } from 'react-materialize';

import './slider.css';
import Timer from './Timer';
import ModalProducts from './modalProducts';

const SliderComponent = () => {
  const [verifyExistDate, setVerifyExistDate] = useState(
    window.localStorage.getItem('timeDeal')
  );
  const [deal, setDeal] = useState(null);
  const [hiddenProducts, setHiddenProducts] = useState(false);
  setTimeout(() => setHiddenProducts(true), 8000)

  useEffect(() => {
    /* Search any deal */
    async function fetchData() {
      await axios
        .get('/api/deal')
        .then((res) => {
          if (res.data[0] === undefined) {
            setDeal(null);
            window.localStorage.removeItem('timeDeal');
          } else {
            setDeal(res.data[0]);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
    fetchData();
  }, []);

  useEffect(() => {
    const dt = new Date();
    setTimeout(() => {
      if (
        verifyExistDate == null ||
        verifyExistDate == undefined
      ) {
        if (deal != null) {
          dt.setHours(dt.getHours() + deal.hoursForDeal);
          window.localStorage.setItem('timeDeal', dt);
        }
      }
    }, 2000);
  }, [deal]);

  return (
    <div className="sliderSection">
      <Slider
        fullscreen={false}
        options={{
          duration: 500,
          height: 400,
          indicators: true,
          interval: 6000
        }}
      >
        <Slide
          image={
            <img
              alt=""
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.bbva.com%2Fwp-content%2Fuploads%2F2018%2F06%2Ffintech-tecnologia-innovacion-digital-blockchain-bbva_opt.jpg&f=1&nofb=1"
            />
          }
        >
          <Caption placement="center">
            {deal != null ? (
              <>
                <h3>{deal.name}</h3>
                <h1>
                  <strong>
                    <Timer verifyExistDate={verifyExistDate} setDeal={setDeal} setHiddenProducts={setHiddenProducts} />
                  </strong>
                </h1>
                <p className="light grey-text text-lighten-3">
                  {deal.description}
                  {hiddenProducts && (
                    <ModalProducts deal={deal} />
                  )}
                </p>
              </>
            ) : (
              <>
                <h3>Dinaware</h3>
                <h5 className="light grey-text text-lighten-3">
                  Compra los mejores productos en tecnologia
                </h5>
              </>
            )}
          </Caption>
        </Slide>
        <Slide
          image={
            <img
              alt=""
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dGVjaG5vbG9neXxlbnwwfHwwfHw%3D&w=1000&q=80"
            />
          }
        >
          <Caption placement="center">
            <h2>... No te lo pierdas ...</h2>
            <h5 className="light grey-text text-lighten-3">
              Venta de productos electronicos y servicios a impresoras y computadoras!
            </h5>
          </Caption>
        </Slide>
      </Slider>
    </div>
  );
};

export default SliderComponent;
