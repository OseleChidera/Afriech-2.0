import React from 'react'
import 'react-slideshow-image/dist/styles.css'
import { Slide, Fade } from 'react-slideshow-image';
export default function ImageSlider() {

    const spanStyle = {
        padding: '10px 25px',
        background: '#efefef',
        color: '#000000',
        borderRadius:`10px`
    }

    const divStyle = {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        height: '270px'
    }
    const slideImages = [
        {
            url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
            caption: 'View Item'
        },
        {
            url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
            caption: 'View Item'
        },
        {
            url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
            caption: 'View Item'
        },
    ];
  return (
      <div className="slide-container flex-1 shadow-md">
          <Slide >
              {slideImages.map((slideImage, index) => (
                  <div key={index}>
                      <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                          <span style={spanStyle}>{slideImage.caption}</span>
                      </div>
                  </div>
              ))}
          </Slide>
      </div>
  )
}
