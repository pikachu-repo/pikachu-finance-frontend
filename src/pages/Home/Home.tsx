import Land from "assets/images/png/land.png";
import slide1 from "assets/images/png/slide1.png";
import slide2 from "assets/images/png/slide2.png";
import slide3 from "assets/images/png/slide3.png";
import slide4 from "assets/images/png/slide4.png";
import slide5 from "assets/images/png/slide5.png";
import slide6 from "assets/images/png/slide6.png";
import slide7 from "assets/images/png/slide7.png";
import { Button } from "components/ui";
import { useState } from "react";
import style from "./Home.module.css";
import cn from "classnames";
import {
  SvgArrowUp,
  SvgEthereum,
  SvgArrowRight,
  SvgArrowLeft,
} from "assets/images/svg";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      console.log("instanceRef", instanceRef.current);
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    mode: "free-snap",
    loop: true,
    slides: {
      origin: "center",
      perView: 2,
      spacing: 30,
    },
  });

  return (
    <section className={cn(style.root)}>
      <div className={cn(style.land)}>
        <div>
          <div className={cn(style.title)}>Be Your Own Bank</div>
          <div className={cn(style.subTitle)}>
            NFT Liquidity <br />
            At Your Own Terms
          </div>
          <div className={cn(style.content)}>
            The most advanced borrowing/lending platform for crypto colletibles
            and non-fungible tokens(NFTs)
          </div>
          <div className={cn(style.buttonBar)}>
            <Button variant="yellow" sx="w-32 h-12">
              Borrow
            </Button>
            <Button variant="yellow" sx="w-32 h-12">
              Lend
            </Button>
            <button>Docs</button>
          </div>
        </div>
        <img src={Land} alt="land" />
      </div>

      <div className={cn(style.state)}>
        <div>
          <div>Current Open Loans</div>
          <div>
            <div className={cn(style.value)}>30</div>
            <SvgArrowUp className="w-5 h-7" />
          </div>
        </div>
        <div>
          <div>Liquidity on PIKACHU</div>
          <div>
            <div className={cn(style.value)}>1,280</div>
            <SvgArrowUp className="w-5 h-7" />
          </div>
        </div>
        <div>
          <div>Verified Collecction</div>
          <div>
            <div className={cn(style.value)}>3527.50</div>
            <SvgEthereum className="w-5 h-5" />
            <SvgArrowUp className="w-5 h-7" />
          </div>
        </div>
      </div>

      <div className={cn(style.carousel)}>
        <div className={cn(style.title)}>Popular Collections</div>
        <div className="relative px-16">
          <div ref={sliderRef} className="keen-slider">
            <div className="keen-slider__slide">
              <img src={slide1} alt="slide1" className="w-full" />
            </div>
            <div className="keen-slider__slide">
              <img src={slide2} alt="slide1" className="w-full" />
            </div>
            <div className="keen-slider__slide">
              <img src={slide3} alt="slide1" className="w-full" />
            </div>
            <div className="keen-slider__slide">
              <img src={slide4} alt="slide1" className="w-full" />
            </div>
            <div className="keen-slider__slide">
              <img src={slide5} alt="slide1" className="w-full" />
            </div>
            <div className="keen-slider__slide">
              <img src={slide6} alt="slide1" className="w-full" />
            </div>
            <div className="keen-slider__slide">
              <img src={slide7} alt="slide1" className="w-full" />
            </div>
          </div>
          {loaded && instanceRef.current && (
            <>
              <div
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
                className={cn(style.arrow, style.Left)}
              >
                <SvgArrowRight />
              </div>

              <div
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.next()
                }
                className={cn(style.arrow, style.Right)}
              >
                <SvgArrowLeft />
              </div>
            </>
          )}
          {loaded && instanceRef.current && (
            <div className={cn(style.dots)}>
              {[
                ...(Array(
                  instanceRef.current.track.details.slides.length
                ).keys() as any),
              ].map((idx) => {
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      instanceRef.current?.moveToIdx(idx);
                    }}
                    className={cn(
                      style.dot,
                      currentSlide === idx ? style.active : ""
                    )}
                  ></button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;