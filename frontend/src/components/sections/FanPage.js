import React, { useState } from "react";
import classNames from "classnames";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import ProgressBar from "@ramonak/react-progress-bar";

import Button from "../elements/Button";
import Input from "../elements/Input";

const CreateForm = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {
  const outerClasses = classNames(
    "hero section center-content",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "hero-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  const markdown = `Hi G-Fuel Friend, 
  
  Here is a video call link, where I would be talking to my fans exclusively this weekend! 

  [VIDEO LINK](https://meet.google.com/dky-kqnn-owo)
`;

  const markdown2 = `Exclusive Content based on Roles!`;
  return (
    <section {...props} className={outerClasses}>
      <div className="container-sm">
        <div className={innerClasses}>
          <h1>Fandom</h1>
          <section style={{ textAlign: "left" }}>
            <h3>The Bro Army!</h3>
            <div style={{ display: "grid", gridTemplateColumns: "3fr 9fr" }}>
              <div style={{height: "330px", padding: "10px 10px 10px 10px", backgroundColor: "white"}}>
              <img  src="https://i.imgur.com/u8dlPsa.png" />

              </div>

              <div
                style={{
                  backgroundColor: "grey",
                  color: "black",
                  padding: "20px 20px 20px 20px",
                }}
              >
                <div style={{ height: "200px" }}>
                  <ReactMarkdown
                    remarkPlugins={[gfm]}
                    children={markdown}
                  ></ReactMarkdown>
                </div>
                <div
                  style={{ margin: "20px 20px 20px 20px", textAlign: "right" }}
                >
                  <Button
                    style={{ textAlign: "right" }}
                    tag="a"
                    color="primary"
                    wideMobile
                    href="/creators/tier"
                  >
                    Interested in Selling NFT
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section style={{ textAlign: "left" }}>
            <h3>Life of a Crypto Traveller!</h3>
            <div style={{ display: "grid", gridTemplateColumns: "3fr 9fr" }}>
            <div style={{height: "330px", backgroundColor: "white"}}>
            <img style={{objectFit: "cover"}} src="https://i.imgur.com/anTvK1F.jpg" />

              </div>

              <div
                style={{
                  backgroundColor: "grey",
                  color: "black",
                  padding: "0px 0px 20px 20px",
                }}
              >
                <div style={{ height: "200px" }}>
                    <h3 style={{color: "black"}}>Troopy Buddies</h3>
                  <ReactMarkdown
                    remarkPlugins={[gfm]}
                    children={markdown2}
                  ></ReactMarkdown>
                </div>
                <div
                  style={{ margin: "20px 20px 20px 20px", textAlign: "right" }}
                >
                  <Button
                    style={{ textAlign: "right" }}
                    tag="a"
                    color="primary"
                    wideMobile
                    disabled
                    href="/creators/tier"
                  >
                    Sell NFT
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default CreateForm;
