import React from 'react';
import './Landingpage.css';
import Slider from './Slider';
import image1 from "../images/Zz02NWNkODEzODRiZDMxMWVkYWU1NjI2Y2QwNTA2MjdhYQ==.jpg";
import { useNavigate } from 'react-router-dom';

const Landingpage = () => {
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      };


      const Navigate=useNavigate();
      const loginNavigation=()=>{
          Navigate('/login')
      };
      const SignupNavigation=()=>{
        Navigate('/signup')
    };

  return (
    <div>
     
     <nav class="flex">
     <div className='animate-charcterzz'> VIDEO VIEW </div>
<a href="javascript:void(0)"/>
<div style={{ display: 'flex', gap: '50px',marginRight:'100px',cursor:'pointer' }}>
<h3 onClick={() => scrollToSection('Contact')}>Galleries</h3>
         
          <h3 onClick={() => scrollToSection('Contact')}>Contact&nbsp;us</h3>
          <h3 onClick={loginNavigation} >Login </h3>
          <h3 onClick={SignupNavigation}>Sign&nbsp;up</h3>
</div>
  </nav>      
      <header>
        <article>
          <h1 className="title big">
            <em>Everything</em> &nbsp; <em>is</em> &nbsp;Design can &nbsp; be art<em>.</em>
          </h1>
          <p style={{marginTop:'20px'}}>
          Social media is a double-edged sword
          Every time I get in the studio, I feel like I wanna have some fun
          </p>
          <a href="/login" className="btn btn_3">
          Get Started
          </a>
        </article>
      </header>

      {/* MAIN */}
      <main id="More">
        {/* DIVISION_1 */}
        <div className="divisions division_1 flex padding_2x">
          <section className="flex_content padding_2x">
            <figure>
              <img src={image1} alt="" loading="lazy" />
            </figure>
          </section>
          <section className="flex_content padding_2x">
            <article>
              <h2 className="title medium">Let's make your Days better.</h2>
              <p>
              The picture that you took with your camera is the imagination you want to create with reality.Taking pictures is like tiptoeing into the kitchen late at night and stealing Oreo cookies
              </p>
              <aside className="fixed_flex">
                <span>
                  <h4 className="title small">50+</h4>
                  <p>Cameras</p>
                </span>
                <span>
                  <h4 className="title small">20+</h4>
                  <p>Collections</p>
                </span>
              </aside>
            </article>
          </section>
        </div>

        {/* DIVISION_2 */}
        <div className="divisions division_2 flex padding_2x">
          {/* Add more content for Division 2 here */}
        </div>

        {/* DIVISION_3 */}
        <div className="divisions division_3 padding_4x">
         <Slider />
        </div>
      </main>

      {/* FOOTER */}
      <footer id="Contact" className="flex">
        <section className="flex_content padding_2x">
          <a ><i className="fa fa-facebook"></i></a>
          <a ><i className="fa fa-instagram"></i></a>
          <a ><i className="fa fa-linkedin"></i></a>
          <a ><i className="fa fa-youtube"></i></a>
        </section>
        <section className="flex_content">
          <a >Balasubaramaniyam</a>
          <a >9344708009</a>
          <a >30/9 ramamoorthy road, Selvapuram, Coimbatore-641026</a>
        </section>
        <section className="flex_content padding_1x">
          <p>© 2023 website name || All rights reserved</p>
        </section>
      </footer>

      {/* ADDITIONAL */}
      <div className="additional flex"></div>
      <a id="roll_back" className="animate">
        <i className="fa fa-angle-up"></i>
      </a>
    </div>
  );
};

export default Landingpage;
