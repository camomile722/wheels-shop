import React, { Component } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";

export default class DropdownSelector extends Component {
  render() {
    return (
      <>
        <DropdownButton id="dropdown-item-button" className="py-5"title="Fahrzeug wählen">
          <Dropdown.Item as="button">BMW</Dropdown.Item>
          <Dropdown.Item as="button">Mercedes</Dropdown.Item>
          <Dropdown.Item as="button">Audi</Dropdown.Item>
          <Dropdown.Item as="button">Ford</Dropdown.Item>
          <Dropdown.Item as="button">Opel</Dropdown.Item>
          <Dropdown.Item as="button">VW</Dropdown.Item>
        </DropdownButton>
      </>
    );
  }
}
