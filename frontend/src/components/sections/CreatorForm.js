import React, { useState } from "react";
import classNames from "classnames";
import axios from "axios";

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

  const [form, setForm] = useState({});
  const nextStep = () => {
    const userAccount = JSON.parse(localStorage.getItem("user_account"));
    const tempState = form;
    tempState["owner_address"] = userAccount["base16"];
    setForm(tempState);
    axios.post(`http://localhost:3002/pages.json`, form).then((response) => {
      //console.log(response);
      window.location.href = `/creators/tier?id=${response.data.id}`;
    });
  };
  return (
    <section {...props} className={outerClasses}>
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h1
              className="mt-0 mb-16 reveal-from-bottom"
              data-reveal-delay="200"
            >
              Create Page
            </h1>
            <div className="container-xs">
              <p
                className="m-0 mb-32 reveal-from-bottom"
                style={{ textAlign: "left" }}
              >
                Page Name:
                <Input
                  id="newsletter"
                  type="email"
                  label="Subscribe"
                  labelHidden
                  hasIcon="right"
                  onChange={(e) => {
                    const tempState = form;
                    tempState["name"] = e.target.value;
                    setForm(tempState);
                  }}
                  placeholder="Page Name"
                ></Input>
                Page Markdown:
                <Input
                  id="newsletter"
                  type="textarea"
                  rows="20"
                  label="Subscribe"
                  labelHidden
                  hasIcon="right"
                  placeholder="Page Markdown"
                  onChange={(e) => {
                    const tempState = form;
                    tempState["markdown"] = e.target.value;
                    setForm(tempState);
                  }}
                ></Input>
                Social Link:
                <Input
                  id="newsletter"
                  type="email"
                  label="Subscribe"
                  labelHidden
                  hasIcon="right"
                  placeholder="Social Link"
                  onChange={(e) => {
                    const tempState = form;
                    tempState["link"] = e.target.value;
                    setForm(tempState);
                  }}
                ></Input>
              </p>
              <div className="reveal-from-bottom" data-reveal-delay="600">
                <Button
                  tag="a"
                  color="primary"
                  wideMobile
                  onClick={() => nextStep()}
                >
                  Next Step
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateForm;
