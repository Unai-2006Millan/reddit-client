import React, { useState } from 'react'
import './App.css'
import Posts from './Posts/Posts';
import SubReddits from './SubReddits/SubReddits';

function App() {

  return (
    <>
      <header>
        <div className='header-logo'>
          <img src="https://www.redditstatic.com/desktop2x/img/favicon/android-icon-192x192.png" alt="Reddit Logo" />
          <h3><span id="special">Reddit</span>Minimal</h3>
        </div>
      </header>
      <article>
        <Posts />
        <div className='load-subreddits'>
          <h2>Subreddits</h2>
          <SubReddits />
        </div>
      </article>
    </>
  )
}

export default App
