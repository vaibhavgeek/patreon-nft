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

  const markdown = `**Hello Bros,**

  My name is Felix Kjellberg and I make videos on youtube channel around gaming and cracking jokes.
  I have made close to 200 videos till now and have seen my viewership and subscriptions rise 5% month on month at an average. 

  I am born and raised in Sweden and enjoy working on Adobe Pohotoshop and editing videos in my free time. 
  
  I have a dog called Edgar. If you believe that the Bro Army will stand solid one day, then please do support me and help with the kind
  of content you would like to watch. 
  
  Signing Off,

  **Felix Arvid Ulf Kjellberg**
`;

  const markdown2 = `Only first 10 supporters are allowed here!
 
  These supporters will have exclusive previliges that are, 
  - Behind the scenes footage of the crew filming!
  - Weekly calls with members (for an hour) and talking about games and life
  - Donating to institution of your choice based on consensus of members
  - First access to roles such as discord moderator and community leader
  - Everything in Fallback Armies`;

  const markdown3 = `Members who supported me whilst 10 to 100 supporters are allowed here!
 
  These supporters will have exclusive previliges that are, 
  - Exclusive merchandise such as cups and tees. 
  - Free access to multiple games on Steam using a special coupon code. 
  - Monthly calls where I talk about you guys enjoyed about last months' videos. 
  `;

  const supportTier = () => {
    window.location.href = `/fans`
  };
  return (
    <section {...props} className={outerClasses}>
      <div className="container-sm">
        <div className={innerClasses}>
          <h1>The Bro Army!</h1>
          <section style={{ textAlign: "left" }}>
            <h3>About `The Bro Army!`</h3>
            <div
              style={{
                backgroundColor: "white",
                color: "black",
                padding: "20px 20px 20px 20px",
              }}
            >
              <ReactMarkdown
                remarkPlugins={[gfm]}
                children={markdown}
              ></ReactMarkdown>
            </div>
          </section>
          <h3>Fandom</h3>
          <section style={{ textAlign: "left" }}>
            <h4>G Fuel Hippppies</h4>
            <div
              style={{
                backgroundColor: "white",
                color: "black",
                padding: "20px 20px 20px 20px",
                margin: "0px 0px 20px 0px",
              }}
            >
              <ReactMarkdown
                remarkPlugins={[gfm]}
                children={markdown2}
              ></ReactMarkdown>
            </div>
            <ProgressBar bgColor={"#5658DD"} completed={80} />
            <div style={{ margin: "20px 20px 20px 20px", textAlign: "right" }}>
              <Button
                style={{ textAlign: "right" }}
                tag="a"
                color="primary"
                wideMobile
                onClick={(e) => supportTier()}
              >
                Support
              </Button>
            </div>
          </section>


          <section style={{ textAlign: "left" }}>
            <h4>Fallback Army</h4>
            <div
              style={{
                backgroundColor: "white",
                color: "black",
                padding: "20px 20px 20px 20px",
                margin: "0px 0px 20px 0px",
              }}
            >
              <ReactMarkdown
                remarkPlugins={[gfm]}
                children={markdown3}
              ></ReactMarkdown>
            </div>
            <ProgressBar bgColor={"#5658DD"} completed={0} />
            <div style={{ margin: "20px 20px 20px 20px", textAlign: "right" }}>
              <Button
              disabled
                style={{ textAlign: "right" }}
                tag="a"
                color="primary"
                wideMobile
                onClick={(e) => supportTier()}
              >
                Support
              </Button>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default CreateForm;
