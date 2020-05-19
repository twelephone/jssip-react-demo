import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import state from "../redux/store";
import TestDialMarkUp from "./TestDialMarkUp";

class Phone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sip: "",
      call: "",
    };

    this.startCall = this.startCall.bind(this);
    this.stopCall = this.stopCall.bind(this);
    this.sendDTMF = this.sendDTMF.bind(this);
    this.sendDTMFOne = this.sendDTMFOne.bind(this);
  }

  static contextTypes = {
    sip: PropTypes.any,
    call: PropTypes.any,
    registerSip: PropTypes.func,
    unregisterSip: PropTypes.func,
    answerCall: PropTypes.func,
    startCall: PropTypes.func,
    stopCall: PropTypes.func,
    sendDTMF: PropTypes.func,
  };

  componentDidUpdate() {
    console.log(this.context.call);
    if (this.context.call !== this.state.call) {
      this.setState({
        //   sip: this.context.sip,
        call: this.context.call,
      });
    }
    if (this.context.sip !== this.state.sip) {
      this.setState({
        sip: this.context.sip,
      });
    }
  }

  componentDidMount() {
    this.setState({
      //   sip: this.context.sip,
      call: this.context.call,
      sip: this.context.sip,
    });
  }

  startCall(e) {
    e.preventDefault();
    console.log("The link was clicked.");
    this.context.startCall("16143543760");
  }

  stopCall(e) {
    e.preventDefault();
    console.log("The link was clicked.");
    this.context.stopCall();
  }

  sendDTMF(e, number) {
    e.preventDefault();
    console.log(`${number} sent`);
    this.context.sendDTMF(number, 100, 70);
  }

  sendDTMFOne(e) {
    e.preventDefault();
    console.log("1 sent");
    this.context.sendDTMF(1, 100, 70);
  }

  render() {
    const callStatus = this.state.call.status;
    const sipStatus = this.state.sip.status;

    let updatedCallStatus = callStatus;
    let updatedSipStatus = sipStatus;
    let dialMarkip;

    //If call is active, show dialpad 1
    if (callStatus === "callStatus/ACTIVE") {
      dialMarkip = (
        <>
          <button href="#" onClick={this.sendDTMFOne}>
            1
          </button>
          <button
            href="#"
            onClick={(e) => {
              this.sendDTMF(e, "3");
            }}
          >
            2
          </button>
          <button
            href="#"
            onClick={(e) => {
              this.sendDTMF(e, "3");
            }}
          >
            3
          </button>
          <button
            href="#"
            onClick={(e) => {
              this.sendDTMF(e, "4");
            }}
          >
            4
          </button>
          <button
            href="#"
            onClick={(e) => {
              this.sendDTMF(e, "5");
            }}
          >
            5
          </button>
          <button
            href="#"
            onClick={(e) => {
              this.sendDTMF(e, "6");
            }}
          >
            6
          </button>
        </>
      );
    } else {
      dialMarkip = <p>Start call to activate dialpad 1</p>;
    }

    //If call is active, show dialpad 2
    let testDialMarkip;
    if (callStatus === "callStatus/ACTIVE") {
      testDialMarkip = <TestDialMarkUp sendDTMF={this.context.sendDTMF} />;
    } else {
      testDialMarkip = <p>Start call to activate dialpad 2</p>;
      //disabled dialpad
    }

    return (
      <div className="App">
        <p>{updatedCallStatus}</p>
        <p>{updatedSipStatus}</p>
        <div>{dialMarkip}</div>
        <div>{testDialMarkip}</div>
        <a href="#" onClick={this.startCall}>
          Start Call
        </a>
        <a href="#" onClick={this.stopCall}>
          End Call
        </a>
      </div>
    );
  }
}

export default Phone;