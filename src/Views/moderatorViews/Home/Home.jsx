import React from "react";
import { connect } from "react-redux";
import get from "lodash.get";
import * as getListActions from "./reducer";
import { serverUrl } from "../../../config";
import HomeIcon from "@material-ui/icons/Home";
import Pagination from "@material-ui/lab/Pagination";
import MessageIcon from "@material-ui/icons/Message";
import {
  Grid,
  CircularProgress,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  FormControl,
  IconButton,
  Tooltip,
  CardActions,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import BusinessIcon from "@material-ui/icons/Business";
class Home extends React.Component {
  state = {
    page: 1,
    status: 0,
    order: 0,
  };
  componentDidMount() {
    this.props.getInfo(this.state.page);
  }
  render() {
    const { data, loading } = this.props;
    const selectOrder = (id,statusId) => {
      this.setState({status:statusId, order: id });
    };
    const deleteOrder = (id) => {
      this.props.deleteOrder(id)
    };
    return (
      <React.Fragment>
        {this.state.order != 0 ? (
          <Grid item xs={5}>
            <FormControl fullWidth className="mt-3">
              <InputLabel id="demo-dialog-select-label">
                Статус замовлення № {this.state.order}
              </InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={this.state.status}
                onChange={(e) => {
                  this.props.changeStatus({id:this.state.order,statusId:e.target.value})
                  this.setState({ status: e.target.value,order:0 });
                }}
              >
                {data.statuses.map(function(el){
                  return(
                    <MenuItem value={el.id} key={el.id}>{el.name}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
        ) : (
          ""
        )}
        <Grid className="mt-2" container>
          {loading ? (
            <div>
              <CircularProgress />
            </div>
          ) : (
            data.orders.map(function (el) {
              return (
                <Grid xs={12} md={6} lg={3} item key={el.id} className="p-3">
                  <Card>
                    <CardHeader title={el.goodsName} subheader={el.storeName} />
                    <CardMedia
                      image={
                        el.goodsImage == null
                          ? serverUrl + "UserImages/" + "default.png"
                          : serverUrl + "UserImages/" + el.goodsImage
                      }
                      style={{ height: "150px" }}
                      title="Order"
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {el.adress}
                      </Typography>
                      <div className="d-flex flex-row mt-2">
                        <Typography
                          variant="body2"
                          className="mr-3"
                          color="textSecondary"
                          component="p"
                        >
                          <HomeIcon className="mr-1" /> {el.house}
                        </Typography>

                        <Typography
                          variant="body2"
                          className="mr-3"
                          color="textSecondary"
                          component="p"
                        >
                          <BusinessIcon className="mr-1" /> {el.flat}
                        </Typography>
                      </div>
                    </CardContent>
                    <CardActions disableSpacing>
                      <Tooltip title="Видалити">
                        <IconButton onClick={(e) => {
                            deleteOrder(el.id);
                          }}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Змінити статус замовлення">
                        <IconButton
                          onClick={(e) => {
                            selectOrder(el.id,el.statusId);
                          }}
                        >
                          <MessageIcon />
                        </IconButton>
                      </Tooltip>
                      {/*<Tooltip style={{marginLeft:"auto"}} title="Надіслати кур'єру">
                        <IconButton>
                          <ArrowForwardIcon />
                        </IconButton>
                      </Tooltip> */}
                    </CardActions>
                  </Card>
                </Grid>
              );
            })
          )}
        </Grid>
        <Pagination
          className="mb-4"
          count={this.props.data.pages}
          page={this.state.page}
          onChange={(e, n) => {
            this.setState({ page: n });
            this.props.getInfo(n);
          }}
        />
      </React.Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    success: get(state, "orders.list.success"),
    failed: get(state, "orders.list.failed"),
    errors: get(state, "orders.list.errors"),
    data: get(state, "orders.list.data"),
    loading: get(state, "orders.list.loading"),
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    getInfo: (page) => {
      dispatch(getListActions.getInfo(page));
    },
    changeStatus: (model) => {
      dispatch(getListActions.changeStatus(model));
    },
    deleteOrder: (id) => {
      dispatch(getListActions.deleteOrder(id));
    },
  };
};
//export default UserProfile;
export default connect(mapStateToProps, mapDispatchToProps)(Home);
