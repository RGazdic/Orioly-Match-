
import React, { Component } from "react";
import "./index.css";
const classNames = require('classnames');

export default class FootballMatchesData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedYear: null,
      matches : []
    };
  }

  loadMatches(year){
    let url = 'https://jsonmock.hackerrank.com/api/football_competitions?year='+year;
    fetch(url)
  .then(response => response.json())
  .then(json => {
    this.setState({
      matches : json
    })
  })
  }

  onClick = (year) => (e) => {
    this.setState({
      selectedYear: year
    });
    this.loadMatches(year);    
  }

  render() {

    var years= [2011, 2012, 2013, 2014, 2015, 2016, 2017];
    return (
      <div className="layout-row">
        <div className="section-title">Select Year</div>
        <ul className="sidebar" data-testid="year-list">
          {years.map((year, i) => {
            return (
              <li className={
                classNames({
                  'sidebar-item': true,
                  'active': this.state.selectedYear === year
                })
              }
              onClick={this.onClick(year)}
              key={year}>
                <a>{year}</a>
              </li>
            )
          })}
        </ul>

        <section className="content">
          <section>
            <div className="total-matches" data-testid="total-matches">{this.state.matches.data && this.state.matches.data.length>0? "Total matches: "+this.state.matches.data.length : null}</div>
            
            <ul className="mr-20 matches styled" data-testid="match-list">
            
              {this.state.matches.data? this.state.matches.data.map((item) => {
                return (
                <li className="slide-up-fade-in" key={"match"+item.name}>
                  Match {item.name} won by {item.winner}
                </li>
                );
                }) : null}
            </ul>
          </section>

          {this.state.matches.data? (this.state.matches.data.length<1? <div data-testid="no-result" className="slide-up-fade-in no-result">No Matches Found</div> : null) : null}
        </section>
      </div>
    );
  }
}