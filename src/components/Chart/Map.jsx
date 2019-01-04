import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
  }
  componentDidMount() {}
  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  render() {
	const { data } = this.props;
	
	
    return (
      <div className="panel ">
        <div className="title-block panel-heading">
          <div className="panel-control">
            <a
              href="javascript:void(0);"
              data-toggle="tooltip"
              data-placement="top"
              title="Expand/Collapse"
              data-original-title="Expand/Collapse"
              className="panel-collapse"
            >
              <i className="icon-arrow-down" />
            </a>
            <a
              href="javascript:void(0);"
              data-toggle="tooltip"
              data-placement="top"
              title="Remove"
              data-original-title="Remove"
              className="panel-remove"
            >
              <i className="icon-close" />
            </a>
          </div>
        </div>
        <div
          className="panel-body"
          style={{
            height: Object.keys(this.props.data).length > 0 ? "350px" : ""
          }}
        >
          {Object.keys(this.props.data).length === 0 && (
            <div className="alert alert-info" role="alert">
              No content
            </div>
          )}
          {Object.keys(this.props.data).length > 0 && (
            <Map
              google={this.props.google}
              zoom={18}
              style={{ position: "initial", width: "100%", minHeight: "370px" }}
              initialCenter={{
                lat: Number(data.coordinate.lat),
                lng: Number(data.coordinate.long)
              }}
              className={"map"}
            >
              {
                <Marker
                  title={data.name}
                  name={data.name}
                  onClick={this.onMarkerClick.bind(this)}
                  position={{
                    lat: Number(data.coordinate.lat),
                    lng: Number(data.coordinate.long)
                  }}
                />
              }
              <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
              >
                <div>
                  <h4>{this.state.selectedPlace.name}</h4>
                </div>
              </InfoWindow>
            </Map>
          )}
        </div>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyDW_VZ6Nv2nWSQs4FOP76QJI6TJ3pCwg8U"
})(GoogleMap);
