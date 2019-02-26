import React, { Component } from 'react';
import Box from "../Box/Box";

export default function InBox(Wrapper, ...Children) {


  const authorizedChildren = Children.filter(
    (Child) => window.isAuthorized(Child, Wrapper.unauthorized)
  );

  const cl = class extends Component {

    static wrapper = Wrapper;
    static children = authorizedChildren;

    render() {

      const boxChildren = authorizedChildren.map(
        (Child) => {return {type: Child, id: Box.id};}
      );

      return(
        <Wrapper {...this.props} ref={(el) => {
          if(!el) return;
          this.ref = el;
          el.state.children = boxChildren;
          this.props.saveState(el.state);
          const child = this.props.parent.state.children.find(
            (child) => child.id === this.props.id
          );
          child.type = Wrapper;
          this.props.parent.forceUpdate();
          window.updateWorkspace();
          }}>
        </Wrapper>
      );
    }
  };

  return cl;
};
