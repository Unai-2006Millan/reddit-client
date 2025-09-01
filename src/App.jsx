import React, { useState } from 'react'
import './App.css'
import LoadPosts from './LoadPosts/LoadPosts';
import LoadSubReddits from './LoadSubReddits/LoadSubReddits';

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
        <LoadPosts />
        <div className='load-subreddits'>
          <h2>Subreddits</h2>
          <LoadSubReddits />
        </div>
      </article>
    </>
  )
}

export default App
