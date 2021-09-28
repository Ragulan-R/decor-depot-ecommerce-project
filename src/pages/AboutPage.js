import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import aboutImg from '../assets/aboutImage.jpg'

const AboutPage = () => {
  return (
    <main>
      <PageHero title='About' />
      <Wrapper className='page section section-center'>
        <img src={aboutImg} alt='home decor' />
        <article>
          <div className='title'>
            <h2>About Us</h2>
            <div className='underline'></div>
          </div>
          <p>
            Decor Depot is committed to providing customers with the best
            shopping experience possible.
          </p>
          <p>
            We offer a wide selection of home furnishings, interior design, and
            décor items at affordable prices.
          </p>
          <p>Create your dream home.</p>
          <p>
            Whether you’re looking for a trendy sofa to spruce up your living
            room or a sleek coffee table to bring your room to life, you are
            sure to find it at Decor Depot.
          </p>
        </article>
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default AboutPage
