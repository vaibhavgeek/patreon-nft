import React, { useState, useEffect } from "react";
import classNames from "classnames";
import axios from "axios";

import Button from "../elements/Button";
import Input from "../elements/Input";

// Initialize Zilliqa
const { BN, Long, bytes, units } = require("@zilliqa-js/util");
const { toBech32Address } = require("@zilliqa-js/crypto");
const { Zilliqa } = require("@zilliqa-js/zilliqa");
const { StatusType, MessageType } = require("@zilliqa-js/subscriptions");


const Tier = ({ index, form, setTiers, tiers }) => {
  return (
    <div>
      <div style={{ textAlign: "left", margin: "0px 0px 32px 0px" }}>
        {tiers.length > 1 && (
          <div style={{ textAlign: "right" }}>
            <Button
              tag="a"
              color="primary"
              onClick={() => {
                setTiers(tiers.filter((el, i) => i !== index));
              }}
            >
              -
            </Button>
          </div>
        )}
        Tier Name
        <Input
          id={`name_${index}`}
          defaultValue={form.name}
          type="name"
          label="Subscribe"
          onChange={(e) => {
            const tempState = [...tiers];
            tempState[index]["name"] = e.target.value;
            setTiers(tempState);
          }}
          labelHidden
          hasIcon="right"
          placeholder="Tier Name"
        ></Input>
        <div style={{ display: "grid", gridTemplateColumns: "6fr 6fr" }}>
          <div>
            Subsriber Count From
            <Input
              id={`fromSub_${index}`}
              defaultValue={form.fromSub}
              type="number"
              size="50"
              label="Subscribe"
              labelHidden
              hasIcon="right"
              placeholder="Your best email"
              onChange={(e) => {
                const tempState = [...tiers];
                tempState[index]["fromSub"] = e.target.value;
                setTiers(tempState);
              }}
            ></Input>
          </div>
          <div>
            Subsriber Count To
            <Input
              id={`toSub_${index}`}
              type="number"
              size="50"
              label="Subscribe"
              labelHidden
              hasIcon="right"
              placeholder="Your best email"
              onChange={(e) => {
                const tempState = [...tiers];
                tempState[index]["toSub"] = e.target.value;
                setTiers(tempState);
              }}
            ></Input>
          </div>
        </div>
        Benefits Tier Markdown
        <Input
          id={`aboutM_${index}`}
          type="textarea"
          rows="10"
          label="Benefits"
          labelHidden
          hasIcon="right"
          placeholder="Benefits of joining this tier"
          onChange={(e) => {
            const tempState = [...tiers];
            tempState[index]["aboutM"] = e.target.value;
            setTiers(tempState);
          }}
        ></Input>
        Exclusive Tier Markdown
        <Input
          id={`exclusiveM_${index}`}
          type="textarea"
          rows="10"
          label="exclusive"
          labelHidden
          hasIcon="right"
          placeholder="Exclusive Content shown to this tier"
          onChange={(e) => {
            const tempState = [...tiers];
            tempState[index]["exclusiveM"] = e.target.value;
            setTiers(tempState);
          }}
        ></Input>
        NFT Link
        <Input
          id={`NFT_${index}`}
          type="email"
          label="Subscribe"
          labelHidden
          hasIcon="right"
          placeholder="Link for NFT Token"
          onChange={(e) => {
            const tempState = [...tiers];
            tempState[index]["NFT"] = e.target.value;
            setTiers(tempState);
          }}
        ></Input>
      </div>
    </div>
  );
};

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
  const emptyState = {
    name: "",
    fromSub: 0,
    toSub: 0,
    aboutM: "",
    exclusiveM: "",
    NFT: "",
  };
  let params = (new URL(document.location)).searchParams;
  let pageId = params.get("id");
  const [tiers, setTiers] = useState([emptyState]);
  const [loading, setLoading] = useState(false);

  const CompletePage = (hash) => {

    tiers.map((form,index) => {
      let data = {
        "page": pageId.toString(),
        "name": form.name.toString(),
        "from": form.fromSub.toString(),
        "to": form.toSub.toString(),
        "benefits": form.aboutM.toString(),
        "exclusive": form.exclusiveM.toString(),
        "link": form.NFT.toString(),
        "batch_hash": hash.toString()
      };
      //call API to store tiers data!
      axios.post('http://localhost:3002/tiers.json', data).then((response) => {
        console.log(response);
      });

    });
  };

  const eventlog = async () => {
    const zilliqa = new Zilliqa('https://dev-api.zilliqa.com');
    const subscriber = zilliqa.subscriptionBuilder.buildEventLogSubscriptions(
      'wss://dev-ws.zilliqa.com',
      {
        // smart contract address you want to listen on  
        addresses: ['0xb63bd36956bf659cb44f23fccfa1c750f3601474'],
      },
    );
    
    subscriber.emitter.on(StatusType.SUBSCRIBE_EVENT_LOG, (event) => {
      // if subscribe success, it will echo the subscription info
      console.log('get SubscribeEventLog echo : ', event);
    });
    
    subscriber.emitter.on(MessageType.EVENT_LOG, (event) => {
      console.log('get new event log: ', JSON.stringify(event));
      let tokenIds=[];
      // updating the welcome msg when a new event log is received related to getHello() transition
      if(event.hasOwnProperty("value")){
        
          for(var eventLog in event["value"][0]["event_logs"]){
            console.log("eventLog", eventLog);
              for(var param in  event["value"][0]["event_logs"][eventLog]["params"]){
                console.log("param" , param);
                if(event["value"][0]["event_logs"][eventLog]["params"][param]["vname"] == "token_id"){
                  tokenIds.push(event["value"][0]["event_logs"][eventLog]["params"][param]["value"]);
                }
              }
          }
        CompletePage(tokenIds.toString());
        setLoading(false);
        window.location.href=`/pages/${pageId}`
        
      }
      
      
    });  
    await subscriber.start();
  };


  const createTiersNFT = async () => {
    setLoading(true);
    let list_of_uris = [];
    tiers.map((form,index) => {
      for(var i=form.fromSub;i<form.toSub;i++)
          list_of_uris.push(form.NFT);
    });
    let contractAddress ="0xb63bd36956bf659cb44f23fccfa1c750f3601474";
    const userAccount = JSON.parse(localStorage.getItem("user_account"));
    const userAddress = userAccount["base16"];
    
    const zilliqa = window.zilPay;
    const CHAIN_ID = 333;
    const MSG_VERSION = 1;
    const VERSION = bytes.pack(CHAIN_ID, MSG_VERSION);   
    const myGasPrice = units.toQa('2000', units.Units.Li); // Gas Price that will be used by all transactions
    contractAddress = contractAddress.substring(2);
    const ftAddr = toBech32Address(contractAddress);
  
    try {
        //console.log("start event!");
        const contract = zilliqa.contracts.at(ftAddr);
        const callTx = await contract.call(
            "BatchMint",
            [
                {
                    vname: "to",
                    type: "ByStr20",
                    value: `${userAddress}`
                },
                {
                  vname: "token_uris_list",
                  type: "List (String)",
                  value: list_of_uris
                }
            ],
            {
                // amount, gasPrice and gasLimit must be explicitly provided
                version: VERSION,
                amount: new BN(0),
                gasPrice: myGasPrice,
                gasLimit: Long.fromNumber(10000),
            }
        );

        console.log(callTx);
        eventlog();
  
    } catch (err) {
        console.log(err);
    }
  };
  
  useEffect(() => {
    tiers.map((form, index) => {
      document.querySelector(`#name_${index}`).value = form.name;
      document.querySelector(`#fromSub_${index}`).value = form.fromSub;
      document.querySelector(`#toSub_${index}`).value = form.toSub;
      document.querySelector(`#aboutM_${index}`).value = form.aboutM;
      document.querySelector(`#exclusiveM_${index}`).value = form.exclusiveM;
      document.querySelector(`#NFT_${index}`).value = form.NFT;
    });
  }, [tiers]);

  return (
    <section {...props} className={outerClasses}>
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h1
              className="mt-0 mb-16 reveal-from-bottom"
              data-reveal-delay="200"
            >
              Define Tiers
            </h1>
            <div className="container-xs">
              {tiers.map((form, index) => (
                <Tier
                  setTiers={setTiers}
                  tiers={tiers}
                  form={form}
                  index={index}
                />
              ))}
              <div style={{ textAlign: "right" }}>
                <Button
                  tag="a"
                  color="primary"
                  onClick={() => {
                    const nextState = [...tiers];
                    nextState.push(emptyState);
                    setTiers(nextState);
                  }}
                >
                  +
                </Button>
              </div>

              <div className="reveal-from-bottom" data-reveal-delay="600">
                {loading ? (<Button tag="a" color="primary" disabled>
                  Loading...
                </Button>) : (<Button tag="a" color="primary" onClick={() => createTiersNFT()}>
                  Done!
                </Button>)}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateForm;
