import { css } from "@emotion/react";

export const GlobalStyles = css`
  @import "https://cdn.jsdelivr.net/npm/react-loading-skeleton@3.5.0/dist/skeleton.css";
  @import "https://cdn.jsdelivr.net/npm/@mysten/dapp-kit@0.14.25/dist/esm/index.css";
  @font-face {
    font-family: "Proto";
    src: url("https://interest-protocol.github.io/fonts/proto/ProtoMono-Regular.eot");
    src:
      local("Proto Mono Regular"),
      local("ProtoMono-Regular"),
      url("https://interest-protocol.github.io/fonts/proto/ProtoMono-Regular.eot?#iefix")
        format("embedded-opentype"),
      url("https://interest-protocol.github.io/fonts/proto/ProtoMono-Regular.woff2")
        format("woff2"),
      url("https://interest-protocol.github.io/fonts/proto/ProtoMono-Regular.woff")
        format("woff"),
      url("https://interest-protocol.github.io/fonts/proto/ProtoMono-Regular.ttf")
        format("truetype");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Proto";
    src: url("https://interest-protocol.github.io/fonts/proto/ProtoMono-Medium.eot");
    src:
      local("Proto Mono Medium"),
      local("ProtoMono-Medium"),
      url("https://interest-protocol.github.io/fonts/proto/ProtoMono-Medium.eot?#iefix")
        format("embedded-opentype"),
      url("https://interest-protocol.github.io/fonts/proto/ProtoMono-Medium.woff2")
        format("woff2"),
      url("https://interest-protocol.github.io/fonts/proto/ProtoMono-Medium.woff")
        format("woff"),
      url("https://interest-protocol.github.io/fonts/proto/ProtoMono-Medium.ttf")
        format("truetype");
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Satoshi";
    src:
      url("https://interest-protocol.github.io/fonts/satoshi/Satoshi-Medium.woff2")
        format("woff2"),
      url("https://interest-protocol.github.io/fonts/satoshi/Satoshi-Medium.woff")
        format("woff"),
      url("https://interest-protocol.github.io/fonts/satoshi/Satoshi-Medium.ttf")
        format("truetype");
    font-weight: 500;
    font-display: swap;
    font-style: normal;
  }

  @font-face {
    font-family: "Satoshi";
    src:
      url("https://interest-protocol.github.io/fonts/satoshi/Satoshi-Bold.woff2")
        format("woff2"),
      url("https://interest-protocol.github.io/fonts/satoshi/Satoshi-Bold.woff")
        format("woff"),
      url("https://interest-protocol.github.io/fonts/satoshi/Satoshi-Bold.ttf")
        format("truetype");
    font-weight: 700;
    font-display: swap;
    font-style: normal;
  }

  .ipx-terminal * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Satoshi";
  }

  html {
    scroll-behavior: smooth;
  }

  body,
  html {
    overflow-x: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  /* width */
  .ipx-terminal ::-webkit-scrollbar {
    width: 10px;
    padding: 2rem;
  }

  /* Track */
  .ipx-terminal ::-webkit-scrollbar-track {
    border-radius: 0.5rem;
    background: transparent;
    transition: all 300ms ease-in-out;
  }

  /* Track on hover */
  .ipx-terminal ::-webkit-scrollbar-track:hover {
    background: #fff1;
  }

  /* Handle */
  .ipx-terminal ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 0.5rem;
    border: 5px solid transparent;
  }
`;