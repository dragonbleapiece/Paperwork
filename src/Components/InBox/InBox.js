import React, { Component } from 'react';
import Box from "../Box/Box";

export default function InBox(Wrapper, props, ...Children) {
  let cl = class extends Component {
    render() {
      return(
        <Wrapper {...props}>
        </Wrapper>
      );
    }
  };
  cl.wrapper = Wrapper;
  cl.children = Children; //mettre unauthorized en static
};
