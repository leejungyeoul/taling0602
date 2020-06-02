import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Jumbotron, Button} from 'reactstrap';
import {  Card, CardImg, CardText, CardBody,  CardTitle, CardSubtitle} from 'reactstrap';
import { UncontrolledCollapse} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width : ""
    };
  }
  componentDidMount() {
    $('#map').show()
    $('#parent4').show()
    $('#parent5').show()
    $('#parent6').show()
    try {
      var navbarCollapse = function() {
        if ($("#mainNav").offset().top > 100) {
          $("#mainNav").addClass("navbar-scrolled");
        } else {
          $("#mainNav").removeClass("navbar-scrolled");
        }
      };
    } catch (error) {
      
    }
    navbarCollapse();
    $(window).scroll(navbarCollapse);
    $( 'html, body' ).animate( { scrollTop : 0 }, 400 );
  }

  render() {
    return (
      <body id="page-top">
      <nav id="mainNav"></nav>
      </body>
    )
  }
}

export default App;