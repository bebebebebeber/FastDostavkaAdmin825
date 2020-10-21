import React from "react";
import { connect } from "react-redux";
import get from "lodash.get";
import * as getListActions from "./reducer";
import { serverUrl } from "../../../config";
import HomeIcon from "@material-ui/icons/Home";
import Pagination from "@material-ui/lab/Pagination";
import MessageIcon from "@material-ui/icons/Message";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import CropperPage from "../../../components/Cropper/CropperPage";
import {
  Grid,
  CircularProgress,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Avatar,
  FormControl,
  IconButton,
  Tooltip,
  CardActions,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Badge,
  TextField,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import BusinessIcon from "@material-ui/icons/Business";
import { isThisISOWeek } from "date-fns/esm";
class Home extends React.Component {
  state = {
    name: "",
    description: "",
    category: null,
    position: null,
    image: "",
  };
  getGoogleMaps() {
    // If we haven't already defined the promise, define it
    if (!this.googleMapsPromise) {
      this.googleMapsPromise = new Promise((resolve) => {
        // Add a global handler for when the API finishes loading
        window.resolveGoogleMapsPromise = () => {
          // Resolve the promise
          resolve(window.google);

          // Tidy up
          delete window.resolveGoogleMapsPromise;
        };

        // Load the Google Maps API
        const script = document.createElement("script");
        const API = "AIzaSyDr8CsNRmxMo99IZBmECPGQ5w9tzGDAnm8";
        script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&callback=resolveGoogleMapsPromise`;
        script.async = true;
        document.body.appendChild(script);
      });
    }

    // Return a promise for the Google Maps API
    return this.googleMapsPromise;
  }

  componentWillMount() {
    // Start Google Maps API loading since we know we'll soon need it
    this.getGoogleMaps();
  }
  componentDidMount() {
    this.props.getInfo();

    this.getGoogleMaps().then((google) => {
      const uluru = { lat: 50.619159, lng: 26.252014 };
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: uluru,
      });
      let markers: google.maps.Marker[] = [];
      map.addListener("click", (event) => {
        if (this.state.position == null) {
          const marker = new google.maps.Marker({
            position: event.latLng,
            map: map,
          });
          marker.addListener("click", (event) => {
            this.setState({ position: null });
            setMapOnAll(null);
          });
          //console.log(event.latLng.lat());
          this.setState({ position: event.latLng });
          markers.push(marker);
        }
      });
      function setMapOnAll(map: google.maps.Map | null) {
        for (let i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }
    });
  }

  render() {
    const { data, loading } = this.props;
    const { name, description, category, position, image } = this.state;

    const deleteOrder = (id) => {
      this.props.deleteStore(id);
    };
    const triggerChildInput = () => {
      this.refs.cropp.handleClick();
    };
    const getCroppedImage = (img) => {
      this.setState({ image: img });
      //this.props.changeImage({ image: img, id: this.props.chatId });
    };
    //console.log(data)
    return (
      <React.Fragment>
        <Grid className="mt-2" container>
          <Grid item xs={12} md={6}>
            <div className="p-3">
              <Badge
                overlap="circle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                badgeContent={
                  <IconButton
                    aria-label="upload picture"
                    color="primary"
                    onClick={triggerChildInput}
                  >
                    <PhotoCamera />
                  </IconButton>
                }
              >
                <Avatar
                  alt="avatar"
                  src={this.state.image}
                  style={{ height: 200, width: 200 }}
                ></Avatar>
              </Badge>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="p-3">
              <div id="map" style={{ height: 300 }}></div>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="p-3">
              <TextField
                fullWidth
                label="Ім'я"
                variant="outlined"
                value={this.state.name}
                onChange={(e) => {
                  this.setState({ name: e.target.value });
                }}
              />
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="p-3">
              <TextField
                fullWidth
                label="Опис"
                variant="outlined"
                value={this.state.description}
                onChange={(e) => {
                  this.setState({ description: e.target.value });
                }}
              />
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="p-3"> 
            {data !== undefined ?
              data.categories !== undefined ? (
                <TextField
                  fullWidth
                  label="Категорія"
                  variant="outlined"
                  select
                  value={this.state.category}
                  ite
                  onChange={(e) => {
                    this.setState({ category: e.target.value });
                  }}
                >
                  {data.categories.map(function (el) {
                    return (
                      <MenuItem value={el.id} key={el.id}>
                        {el.name}
                      </MenuItem>
                    );
                  })}
                </TextField>
              ) : (
                ""
              )
              :""}
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            className="d-flex justify-content-end align-items-end"
          >
            <Button
              color="primary"
              variant="contained"
              onClick={(e) => {
                // let lat = position.lat();
                // let lng = position.lng()
                this.props.createStore({ name, description,categoryId:category,coordinate1: position.lat(),coordinate2: position.lng(), image });
                //console.log(lat,lng);
              }}
            >
              Додати
            </Button>
          </Grid>
        </Grid>
        <Grid className="mt-2" container>
          {loading ? (
            <div>
              <CircularProgress />
            </div>
          ) : (
            data.stores.map(function (el) {
              return (
                <Grid xs={12} md={6} lg={3} item key={el.id} className="p-3">
                  <Card>
                    <CardHeader title={el.name} />
                    <CardMedia
                      image={
                        el.image == null
                          ? serverUrl + "UserImages/" + "default.png"
                          : serverUrl + "UserImages/" + el.image
                      }
                      style={{ height: "150px" }}
                      title="Order"
                    />
                    <CardActions disableSpacing>
                      <Tooltip title="Видалити">
                        <IconButton
                          onClick={(e) => {
                            deleteOrder(el.id);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })
          )}
        </Grid>
        <CropperPage
          ref="cropp"
          getCroppedImage={getCroppedImage}
          isHidden={true}
          isForAvatar={true}
        />
      </React.Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    success: get(state, "stores.list.success"),
    failed: get(state, "stores.list.failed"),
    errors: get(state, "stores.list.errors"),
    data: get(state, "stores.list.data"),
    loading: get(state, "stores.list.loading"),
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    getInfo: () => {
      dispatch(getListActions.getInfo());
    },
    deleteStore: (id) => {
      dispatch(getListActions.deleteStore(id));
    },
    createStore: (model) => {
      dispatch(getListActions.createStore(model));
    },
  };
};
//export default UserProfile;
export default connect(mapStateToProps, mapDispatchToProps)(Home);
