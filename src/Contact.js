import React from 'react';
import styled from 'styled-components';

function Contact() {
  return (
    <Wrapper>
      <h2 className='common-heading'>Contact Page</h2>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.3640944660096!2d80.92834327519078!3d26.891937660983437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3999562569ca96ef%3A0x6ac871a588aae658!2s3rd%20St%2C%20Adarsh%20Puram%2C%20Triveni%20Nagar%2C%20Lucknow%2C%20Uttar%20Pradesh%20226020!5e0!3m2!1sen!2sin!4v1706616102542!5m2!1sen!2sin" 
      width="100%" height="450" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"> 
      </iframe>

      <div className="container">
        <div className="contact-form">
          <form action="https://formspree.io/f/moqgaljz" method='POST'className='contact-inputs'>
            {/* UserName */}
            <input type="text" name="username" placeholder='Enter your username' required autoComplete='off'/>
            {/* Email */}
            <input type="email" name="Email" placeholder='Enter your email' required autoComplete='off'/>
            {/* Message */}
            <textarea name="Message" placeholder='Enter your message' cols="30" rows="10" required autoComplete='off'></textarea>
            {/* Input type Submit */}
            <input type="submit" value="send"/>
          </form>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
    padding: 9rem 0 5rem 0;
    text-align: center;

    .container {
      margin-top: 6rem;

      .contact-form {
        max-width: 50rem;
        margin: auto;

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 3rem;

          input[type="submit"] {
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              background-color: ${({ theme }) => theme.colors.white};
              border: 1px solid ${({ theme }) => theme.colors.btn};
              color: ${({ theme }) => theme.colors.btn};
              transform: scale(0.9);
            }
          }
        }
      }
    }
  `;

export default Contact;
