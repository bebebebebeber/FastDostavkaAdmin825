import React from "react";
import { connect } from "react-redux";
import get from "lodash.get";
import * as getListActions from "./reducer";
import { serverUrl } from "../../../config";
import Pagination from "@material-ui/lab/Pagination";
import DescriptionIcon from '@material-ui/icons/Description';
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
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import BusinessIcon from "@material-ui/icons/Business";
class Home extends React.Component {
  state = {
    page: 1,
    order: 0,
  };
  componentDidMount() {
    this.props.getProducts(this.state.page);
  }
  render() {
    const { data, loading } = this.props;
    const deleteProduct = (id) => {
      this.props.deleteProduct(id)
    };
    return (
      <React.Fragment>
        <Grid className="mt-2" container>
          {loading ? (
            <div>
              <CircularProgress />
            </div>
          ) : (
            data.products.map(function (el) {
              return (
                <Grid xs={12} md={6} lg={3} item key={el.id} className="p-3">
                  <Card>
                    <CardHeader title={el.name} subheader={el.storeName} />
                    <CardMedia
                      image={
                        el.image == null
                          ? serverUrl + "UserImages/" + "default.png"
                          : serverUrl + "UserImages/" + el.image
                      }
                      style={{ height: "150px" }}
                      title="Order"
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        style={{textAlign:'center'}}
                      >
                        <b style={{ fontSize: '17px' }} >Ціна: </b> <b>{el.price}</b> карб.
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        style={{ fontSize: '16px' }}
                        className="mt-3"
                      >
                        <DescriptionIcon className="mr-1" />  {el.decription}
                      </Typography>                  
                    </CardContent>
                    <CardActions disableSpacing>
                      <Tooltip title="Видалити">
                        <IconButton onClick={(e) => {
                            deleteProduct(el.id);
                          }}>
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
        <Pagination
          className="mb-4"
          count={this.props.data.pages}
          page={this.state.page}
          onChange={(e, n) => {
            this.setState({ page: n });
            this.props.getProducts(n);
          }}
        />
      </React.Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    success: get(state, "products.list.success"),
    failed: get(state, "products.list.failed"),
    errors: get(state, "products.list.errors"),
    data: get(state, "products.list.data"),
    loading: get(state, "products.list.loading"),
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: (page) => {
      dispatch(getListActions.getProducts(page));
    },
    deleteProduct: (id) => {
      dispatch(getListActions.deleteProduct(id));
    },
  };
};
//export default UserProfile;
export default connect(mapStateToProps, mapDispatchToProps)(Home);
