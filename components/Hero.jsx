import React from 'react'

const Hero = () => {
  return (
    <section >
  <div className="mx-auto max-w-screen-xl px-4 py-48 lg:flex  lg:items-center">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
      Ai Course generator
        <strong className="font-extrabold text-primary sm:block">Custom Learning Paths,Powerer by AI  </strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed text-white">
        Unlock Personalized education with AI-driven course creation. Tailor your learning journey to fit
        you unique goals and pace
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
          href="./dashboard"
        >
          Get Started
        </a>

        
      </div>
    </div>
  </div>
</section>
  )
}

export default Hero