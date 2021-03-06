import React, { Component} from 'react';
import { connect } from "react-redux";
import get from "lodash.get";
import * as getListActions from "./reducer";
import * as getStoresListActions from "./reducer";
import * as getCroppedListActions from "./reducer";
import {
  TextField,
  FormHelperText
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Toast } from 'primereact/toast';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import 'primereact/resources/themes/saga-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Loader from "../../../components/Loader";
import CropperPage from '../../../components/Cropper/CropperPage';
import StoresService from '../../moderatorViews/Stores/StoresService';
import { serverUrl } from '../../../config';

class addProduct extends Component {
    state = {
        success: false,
        failed: false,
        errors: {},
        name: '',
        image: '',
        description: '',
        price: 0,
        storeId: 0,
        croppedImage:""       
      };
      getCroppedImage = (img) => {
        this.setState(
          {
            croppedImage: img,
          },
          this.changeImage
        );
        console.log(img)
      };
    
      changeImage = () => {
        this.props.sendCroppedImage({ image: this.state.croppedImage });
      };
    componentDidMount = () => {
      this.props.getStores();
    }
    componentWillReceiveProps = (nextProps) => {
      if (nextProps !== this.props) {
        console.log("np: ", nextProps);
        this.setState({ success: nextProps.success, failed: nextProps.failed });
      }
    }
    changeStore = (event) => {
      const storeId = event.target.value;
      this.setState({ storeId: storeId });
    }
    LoadResponceErrors() {
      const { success, failed } = this.state;
      if (success == true && failed == false&&this.toast!==undefined) {
        this.toast.show({ life: 6000, severity: 'success', summary: 'Successfully added', detail: 'Add product' });
        this.setState({ success: false, failed: false });
      }
      if (success == false && failed == true&&this.toast!==undefined) {
        this.toast.show({ life: 6000, severity: 'error', summary: 'Error', detail: 'Error occured' });
        this.setState({ success: false, failed: false });
      }
    }
    LoadInputErrors(fieldName) {
      if (typeof (this.state.errors.hasOwnProperty(fieldName))) {
        return (
          <FormHelperText error>{this.state.errors[fieldName]}</FormHelperText>
        )
      }
    }
    handleChange = (e) => {
        this.setStateByErrors(e.target.name, e.target.value);
    }
    setStateByErrors = (name, value) => {
      if (!!this.state.errors[name]) {
        let errors = Object.assign({}, this.state.errors);
        delete errors[name];
        this.setState(
          {
            [name]: value,
            errors
          }
        )
      }
      else {
        this.setState(
          { [name]: value })
      }
    }

    onSubmit = (e) => {
      e.preventDefault();
      let errors = {};
      const { name, description, price, storeId} = this.state;
      const image = this.props.cropImg;
      if (name === '') errors.name = "Field is important";
      //if (image === '') errors.image = "Field is important";
      if (description === '') errors.description = "Field is important";
      if (price === 0) errors.price = "Field is important";
      if (storeId === '') errors.storeId = "Field is important";
      const isValid = Object.keys(errors).length === 0;
      if (isValid) {  
        this.props.addProduct({
          name,
          image:this.state.croppedImage,
          description,
          price:parseFloat(price),
          storeId,
        });
      }
      else {
        this.setState({ errors });
      }
    }
  
    render() {
      //console.log("s ", this.state.success, " f ", this.state.failed);
      const { stores, loading } = this.props;
      console.log("kk",stores);
      if (loading == false) {
        return (  
          <div>

          <Paper elevation={7} className="p-3 mt-4">
            <div>
              <Grid container spacing={3}>
                <Grid item lg={4} md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Outlined"
                    variant="outlined"
                    label="Ім'я"
                    name="name"
                    onChange={this.handleChange}
                  />
                  {this.LoadInputErrors("name")}
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Outlined"
                    variant="outlined"
                    label="Price"
                    type="number"
                    InputProps={{ inputProps: { min: 1, max: 1000 } }}
                    name="price"
                    onChange={this.handleChange}
                  />
                  {this.LoadInputErrors("price")}
                </Grid>
                <Grid item lg={4} md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Outlined"
                    variant="outlined"
                    label="Description"
                    name="description"
                    onChange={this.handleChange}
                  />
                  {this.LoadInputErrors("description")}
                </Grid>
              </Grid>
              <Grid justify="space-between" container spacing={3}>
                <Grid item lg={4} md={6} xs={12}>               
                <CropperPage
                 ref="cropperPage"
                 getCroppedImage={this.getCroppedImage}
                 isForAvatar={true}
                />
                
                </Grid>
                  {this.LoadInputErrors("image")}
              </Grid>
              <Grid container spacing={6} direction="column" alignItems="flex-start">
                <Grid item xs>
                  {/* <Dropdown className="mt-2" value={this.state.groupId} options={groups} onChange={this.changeGroup} placeholder="Select a group" /> */}
                  <FormControl style={{minWidth: 200}}>
                    <InputLabel id="dlabel">Store</InputLabel>
                    <Select                   
                      labelId="dlabel"
                      value={this.state.storeId}
                      onChange={this.changeStore}
                    >
                      {
                        stores.map(item => {
                          return (
                            <MenuItem key={item.id} value={item.id}><img className="mr-2" style={{height:"15px"}} src={serverUrl+"UserImages/"+item.image}/>{item.name}</MenuItem>
                          )
                        })
                      }
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={3} direction="column" alignItems="flex-end">
                <Grid item xs>
                  <Toast className="mt-5" ref={(el) => this.toast = el} />
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<SaveIcon />}
                    onClick={this.onSubmit}
                  >
                   Save
                  </Button>
                  
                  {
                    this.LoadResponceErrors()
                  }
                </Grid>
              </Grid>
            </div>
  
          </Paper>
          </div>

        );
      } else {
        return (
          <Loader />
        );
      }
  
    }
  }
  
  const mapStateToProps = state => {
    return {
      stores: get(state, 'addProduct.list.stores'),
      cropImg: get(state, 'addProduct.list.cropImg'),
      loading: get(state, 'addProduct.list.loading'),
      failed: get(state, 'addProduct.list.failed'),
      success: get(state, 'addProduct.list.success')
    };
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      addProduct: model => {
        dispatch(getListActions.addProduct(model));
      },
      sendCroppedImage: model => {
        dispatch(getCroppedListActions.sendCroppedImage(model));
      },
      getStores: () => {
        dispatch(getStoresListActions.getStores());
      }
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(addProduct);