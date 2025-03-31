import { Html, Head, Main, NextScript } from 'next/document'
 
export default function Document() {
  return (
    <Html>
      <Head>
        {/* <link rel="stylesheet" href="..." /> */}
        
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        {/* <link href="https://fonts.googleapis.com/css2?family=Pangolin&family=Press+Start+2P&display=swap" rel="stylesheet"/> */}
        {/* <link href="https://fonts.googleapis.com/css2?family=family=Kumar+One&display=swap" rel="stylesheet"></link> */}
        <link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Inline:opsz,wght@10..72,100..900&family=Kumar+One&family=Kumar+One+Outline&family=Poiret+One&family=Six+Caps&display=swap" rel="stylesheet"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}