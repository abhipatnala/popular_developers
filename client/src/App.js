import React from "react";
import "./App.css";
import Api from "./utils/Api";
import ReactJson from "react-json-view";
import { Container, Row, Col } from "react-bootstrap";
import Dropdown from "react-dropdown";
import LoadingOverlay from "react-loading-overlay";
import "react-dropdown/style.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      language: "ruby",
      period: "weekly",
      statOption: "developer_stats",
      stats: [],
      showLoader: false,
      showError: false
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  changeLanguage = e => {
    this.setState({ language: e.value }, () => this.fetchData());
  };

  changePeriod = e => {
    this.setState({ period: e.value }, () => this.fetchData());
  };

  changeStatOption = e => {
    this.setState({ statOption: e.value }, () => this.fetchData());
  };

  fetchData = () => {
    this.setState({ showLoader: true });
    Api.get(`/${this.state.statOption}`, {
      params: {
        language: this.state.language,
        period: this.state.period
      }
    }).then(response => {
      this.setState({
        stats: response.data,
        showLoader: false,
        showError: false
      });
    }).catch(error => {
      this.setState({
        showLoader: false,
        showError: true
      })
    });
  };

  render() {
    const languages = ["ruby", "javascript", "python", "Java", "C++"];
    const period = ["daily", "weekly", "monthly"];
    const statOptions = ["developer_stats", "repository_stats"];
    const jsonConfig = {
      collapsed: false,
      displayDataTypes: false
    };
    return (
      <div className="App">
        <Container>
          <LoadingOverlay
            active={this.state.showLoader}
            spinner
            text="Loading your stats..."
          >
            <Row>
              <Col>
                <p>Change Language:</p>
              </Col>
              <Col>
                <p>Change period:</p>
              </Col>
              <Col>
                <p>Change Stats:</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <Dropdown
                  className="dropDown"
                  options={languages}
                  onChange={this.changeLanguage}
                  value={this.state.language}
                />
              </Col>
              <Col>
                <Dropdown
                  className="dropDown"
                  options={period}
                  onChange={this.changePeriod}
                  value={this.state.period}
                />
              </Col>
              <Col>
                <Dropdown
                  className="dropDown"
                  options={statOptions}
                  onChange={this.changeStatOption}
                  value={this.state.statOption}
                />
              </Col>
            </Row>
            <Row className="statsColumn">
              {
                (!this.state.showError) ?
                  <div><ReactJson src={this.state.stats} {...jsonConfig} /> </div> :
                  <div>Unknown error occured</div>
              }
            </Row>
          </LoadingOverlay>
        </Container>
      </div>
    );
  }
}
